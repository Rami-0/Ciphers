import logo from "./logo.svg";
import "./App.css";
import * as crypto from "crypto-js";
import { MD5, SHA1, SHA224, SHA256, SHA3, SHA384, SHA512 } from "crypto-js";
import { AES, RC4, RC4Drop, Rabbit, TripleDES, DES } from "crypto-js";
import { useEffect, useState } from "react";

function App() {
	const [state, setState] = useState("AES");
	const [text, setText] = useState(); // is for the text
	const [key, setKey] = useState("Secret Passphrase");
	const [hash, setHash] = useState(""); // for the hash
	const [textArea, setTextArea] = useState();
	const [drop, setDrop] = useState(768); // for the hash
	const [states, setStates] = useState();

	const hashAlgorithms = [
		"MD5",
		"SHA1",
		"SHA224",
		"SHA256",
		"SHA3",
		"SHA384",
		"SHA512",
	];

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

	useEffect(() => {
		if (!(state == "RC4Drop")) {
			setStates({
				state1: {
					text: hash,
					filename: "hash: ",
				},
				state2: {
					text: state,
					filename: "method: ",
				},
				state3: {
					text: text,
					filename: "text: ",
				},
				state4: {
					text: key,
					filename: "key: ",
				},
			});
		} else {
			setStates({
				state1: {
					text: hash,
					filename: "hash: ",
				},
				state2: {
					text: state,
					filename: "method: ",
				},
				state3: {
					text: text,
					filename: "text: ",
				},
				state4: {
					text: drop,
					filename: "drop",
				},
				state5: {
					text: key,
					filename: "key",
				},
			});
		}
		setText("");
		setTextArea("");
	}, [hash]);

	const handleChange = (event) => {
		console.log(event.target.value);
		setState(event.target.value);
	};
	const handelChangeHash = (e) => {
		setHash(e.target.value);
	};
	function handleInputChange(event) {
		setTextArea(event.target.value);
		setText(event.target.value);
	}
	function handleKeyChange(e) {
		setKey(e.target.value);
	}
	function handleFileUpload(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = function (event) {
			setText(event.target.result);
			setTextArea(event.target.result);
		};
		reader.readAsText(file);
	}

	function handelNumberChange(e) {
		setDrop(Number(e.target.value));
	}

	function hashData() {
		let hashValue;
		switch (state) {
			case "MD5":
				hashValue = MD5(text);
				break;
			case "SHA1":
				hashValue = SHA1(text);
				break;
			case "SHA224":
				hashValue = SHA224(text);
				break;
			case "SHA256":
				hashValue = SHA256(text);
				break;
			case "SHA3":
				hashValue = SHA3(text);
				break;
			case "SHA384":
				hashValue = SHA384(text);
				break;
			case "SHA512":
				hashValue = SHA512(text);
				break;
			default:
				throw new Error("Invalid hash algorithm");
		}

		setHash(hashValue.toString());
	}

	function encryptData() {
		let encryptedData;
		switch (state) {
			case "AES":
				// perform AES encryption
				encryptedData = AES.encrypt(text, key).toString();
				break;
			case "RC4":
				// perform RC4 encryption
				encryptedData = RC4.encrypt(text, key).toString();
				break;
			case "RC4Drop":
				// perform RC4-Drop encryption
				encryptedData = RC4Drop.encrypt(text, key, {
					drop: drop,
				}).toString();
				break;
			case "Rabbit":
				// perform Rabbit encryption
				encryptedData = Rabbit.encrypt(text, key).toString();
				break;
			case "DES":
				// perform DES encryption
				encryptedData = DES.encrypt(text, key);
				break;
			case "TripleDES":
				// perform Triple DES encryption
				encryptedData = TripleDES.encrypt(text, key);
				break;
			default:
				// handle invalid state
				alert("Invalid state:");
			// encryptedData = data;
		}
		setHash(encryptedData);
		return encryptedData;
	}

	function decryptData() {
		let decryptData;
		var latin1;
		switch (state) {
			case "AES":
				// perform AES decryption
				decryptData = AES.decrypt(hash, key);
				latin1 = crypto.enc.Latin1.stringify(decryptData);
				break;
			case "RC4":
				// perform RC4 decryption
				decryptData = RC4.decrypt(hash, key);
				latin1 = crypto.enc.Latin1.stringify(decryptData);
				break;
			case "RC4Drop":
				// perform RC4-Drop decryption
				decryptData = RC4Drop.decrypt(hash, key, {
					drop: drop,
				});
				latin1 = crypto.enc.Latin1.stringify(decryptData);
				break;
			case "Rabbit":
				// perform Rabbit decryption
				decryptData = Rabbit.decrypt(hash, key);
				latin1 = crypto.enc.Latin1.stringify(decryptData);
				break;
			case "DES":
				// perform DES decryption
				decryptData = DES.decrypt(hash, key);
				latin1 = crypto.enc.Latin1.stringify(decryptData);
				break;
			case "TripleDES":
				// perform Triple DES decryption
				decryptData = TripleDES.decrypt(hash, key);
				latin1 = crypto.enc.Latin1.stringify(decryptData);
				break;
			default:
				// handle invalid state
				alert("Invalid state:");
		}
		setText(latin1);
		setTextArea(latin1);
	}

	// var encrypted = AES.encrypt("i love u ", key).toString();
	// // var encrypted = "U2FsdGVkX1+D1BoZ+nnx8us3812NoGiVdg6CquEvY6c=";
	// var decrypted = AES.decrypt(encrypted, key);
	// var words = crypto.enc.Base64.parse(encrypted);
	// var hex = crypto.enc.Hex.stringify(words);
	// var latin1 = crypto.enc.Latin1.stringify(decrypted);
	return (
		<div className="main">
			<h1>Ciphers</h1>
			<div className="App">
				<div>
					<input type="file" onChange={handleFileUpload} />
					{!hashAlgorithms.includes(state) ? (
						<div className="key">
							<p>key:</p>
							<input type="text" value={key} onChange={handleKeyChange} name="" id="" />
						</div>
					) : null}
					<textarea
						name=""
						id=""
						cols="50"
						rows="2"
						className="hash"
						value={hash}
						onChange={handelChangeHash}
						placeholder="paste the hash and use the same method to decrypt"></textarea>

					<select onChange={(e) => handleChange(e)} name="" id="">
						<option value="AES">AES</option>
						<option value="RC4">RC4</option>
						<option value="RC4Drop">RC4Drop</option>
						<option value="Rabbit">Rabbit</option>
						<option value="DES">DES</option>
						<option value="TripleDES">TripleDES</option>
						<option value="MD5">MD5</option>
						<option value="SHA1">SHA1</option>
						<option value="SHA224">SHA224</option>
						<option value="SHA256">SHA256</option>
						<option value="SHA3">SHA3</option>
						<option value="SHA384">SHA384</option>
						<option value="SHA512">SHA512</option>
					</select>
					{state === "RC4Drop" ? (
						<input
							type="number"
							name=""
							id=""
							value={drop}
							onChange={handelNumberChange}
							placeholder="Drop: def 768"
						/>
					) : null}

					{!hashAlgorithms.includes(state) ? (
						<div className="buttons">
							<input type="button" value="encryptData" onClick={encryptData} />
							<input type="button" value="decryptData" onClick={decryptData} />
						</div>
					) : (
						<div className="buttons">
							<input type="button" value="Hash data" onClick={hashData} />
						</div>
					)}
					<textarea
						name=""
						id=""
						cols="50"
						rows="2"
						value={textArea}
						onChange={handleInputChange}></textarea>
					<button onClick={downloadAllStates}>Download All States</button>
				</div>
			</div>
		</div>
	);
}

export default App;
