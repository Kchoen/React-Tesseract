import React, { Fragment, useState } from "react";
import Progress from "./Progress";
import Tesseract from "tesseract.js";
function GptProgress(prompt) {
	fetch("https://chatgpt-api.shn.hk/v1/", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer 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`,
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			prompt: "Give me a Hi",
			temperature: 0,
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		}),
	}).then((r) => console.log(r));
}
const FileUpload = () => {
	const [file, setFile] = useState("");
	const [filename, setFilename] = useState("Choose File");
	const [regPercentage, setRegPercentage] = useState(0);
	const [imgURL, setImgURL] = useState();
	const [text, setText] = useState();
	const onChange = async (e) => {
		if (e.target.files.length == 0) return;
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
		let url = URL.createObjectURL(e.target.files[0]);
		setImgURL(url);
		console.log(url);
		Tesseract.recognize(url, "eng+chi_sim", {
			logger: (m) => {
				console.log(m);
				setRegPercentage(m.progress * 100);
			},
		}).then((regText) => {
			console.log(regText.data.text);
			setText(regText.data.text);
			GptProgress(regText);
		});
		// const {
		// 	data: { text },
		// } = await worker.recognize(url);
		// console.log(text);
	};

	return (
		<Fragment>
			{/* {message ? <Message msg={message} /> : null} */}
			{/* <form onSubmit={onSubmit}> */}
			<div className="custom-file mb-4">
				<input
					type="file"
					className="custom-file-input"
					id="customFile"
					onChange={onChange}
				/>
				<label className="custom-file-label" htmlFor="customFile">
					{filename}
				</label>
			</div>

			<Progress percentage={regPercentage} />

			{/* <input
					type="submit"
					value="Upload"
					className="btn btn-primary btn-block mt-4"
				/>
			</form> */}
			<div className="row mt-5">
				<div className="col-md-6 m-auto">
					{imgURL ? (
						<img
							style={{ width: "100%" }}
							src={imgURL}
							alt="your image"
						/>
					) : null}

					<></>
				</div>
				<div className="col-md-6">
					{text ? (
						<textarea
							className="form-control"
							style={{
								width: "100%",
								height: "100%",
							}}
							value={text}
						></textarea>
					) : null}
					<></>
				</div>
			</div>
		</Fragment>
	);
};

export default FileUpload;
