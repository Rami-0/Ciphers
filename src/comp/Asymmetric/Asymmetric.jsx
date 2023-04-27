import JSEncrypt from "jsencrypt";
import React, { useEffect, useState } from "react";
import "../../App.css";

const Asymmetric = () => {
	const [encrypted, setEncrypted] = useState("");
	const [text, setText] = useState("hey");
	const [publicKey, setPublicKey_1] = useState("");
	const [privateKey, setPrivateKey_1] = useState("");
	const [uncrypted, setUncrypted] = useState("");
	const [states, setStates] = useState();

	let encrypt = new JSEncrypt();
	let crypt = new JSEncrypt({ default_key_size: 2048 });

	useEffect(() => {
		setStates({
			state1: {
				text: encrypted,
				filename: "hash: ",
			},
			state2: {
				text: "RSA",
				filename: "method: ",
			},
			state3: {
				text: text,
				filename: "text: ",
			},
			state4: {
				text: privateKey,
				filename: "privatekey",
			},
			state5: {
				text: publicKey,
				filename: "publickey",
			},
		});
	}, [encrypted]);

	function handleTextChange(e, method) {
		method(e.target.value);
	}
	async function getKeys() {
		setPublicKey_1(crypt.getPublicKey());
		setPrivateKey_1(crypt.getPrivateKey());
	}
	function assignKeys() {
		encrypt.setPublicKey(publicKey);
		console.log(privateKey);
		console.log(publicKey);
		console.log(encrypt);
		// console.log(decrypt);
	}

	function handleEnc() {
		setEncrypted(encrypt.encrypt(text));
		console.log(encrypt.encrypt(text));
	}
	function handleDec() {
		let decrypt = new JSEncrypt();
		decrypt.setPrivateKey(privateKey);
		let a = decrypt.decrypt(encrypted);
		setUncrypted(a);
		// console.log(a);
		// console.log(encrypt);
		// console.log(decrypt);
	}

	function handleFileUpload(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = function (event) {
			setText(event.target.result);
		};
		reader.readAsText(file);
	}

	function downloadTextFile(text, filename) {
		const element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(text)
		);
		element.setAttribute("download", `${filename}.txt`);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function downloadAllStates() {
		const fileContent = Object.values(states)
			.map(({ text }) => text)
			.join("\n\n");
		const fileName = "Ciphers.txt";
		downloadTextFile(fileContent, fileName);
	}

	return (
		<div>
			<br />
			<br />
			<br />
			<input type="file" onChange={handleFileUpload} />
			<div className="buttons">
				<button onClick={getKeys}>Get Keys</button>
				<button onClick={assignKeys}>assign Keys</button>
				<button onClick={handleEnc}>encrypt</button>
				<button onClick={handleDec}>decrypt</button>
			</div>
			<p>text</p>
			<textarea
				name=""
				value={text}
				id=""
				onChange={(e) => handleTextChange(e, setText)}
				cols="50"
				rows="2"></textarea>
			<p>encrupted</p>
			<textarea
				name=""
				onChange={(e) => handleTextChange(e, setEncrypted)}
				value={encrypted}
				id=""
				cols="50"
				rows="2"></textarea>
			<p>privateKey</p>
			<textarea
				name=""
				onChange={(e) => handleTextChange(e, setPrivateKey_1)}
				value={privateKey}
				id=""
				cols="50"
				rows="1"></textarea>
			<p>publicKey</p>
			<textarea
				name=""
				onChange={(e) => handleTextChange(e, setPublicKey_1)}
				value={publicKey}
				id=""
				cols="50"
				rows="1"></textarea>
			<p>Decrupted</p>
			<textarea name="" value={uncrypted} id="" cols="50" rows="2"></textarea>
			<br />
			<button onClick={downloadAllStates}>Download All States</button>
		</div>
	);
};

export default Asymmetric;
