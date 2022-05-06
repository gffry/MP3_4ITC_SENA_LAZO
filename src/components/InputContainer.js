import React from "react";

export default function InputContainer({
	label,
	id,
	data,
	setdata,
	type,
	style,
	clearError,
}) {
	return (
		<div className="input-container">
			<label for={id}>{label}</label>
			<input
				className={style}
				id={id}
				onChange={e => {
					clearError();
					setdata(e.target.value);
				}}
				value={data}
				required
				type={type}
			/>
		</div>
	);
}
