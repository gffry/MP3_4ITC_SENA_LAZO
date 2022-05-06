import React from "react";

export default function Error({ text }) {
	return (
		<span className="error">
			<em>{text}</em>
		</span>
	);
}
