<script>
	let sender, sender_email, content;

	const handleSubmit = async () => {
		if (sender !== "" && sender_email !== "" && content !== "") {
			const body = {
				sender,
				sender_email,
				content,
			};

			try {
				const response = await fetch("http://localhost:8080/post", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				});

				const result = await response.json();
				if (result.hasError) throw result;
			} catch (e) {
				console.error("Error in request to server : ", e);
				return;
			}

			sender = "";
			sender_email = "";
			content = "";
		}
	};
</script>

<main>
	<form method="post" on:submit|preventDefault={handleSubmit}>
		<h1>SEND</h1>
		<div>
			<label for="sender">Name</label>
			<input name="sender" type="text" bind:value={sender} />
		</div>

		<div>
			<label for="sender_email">Email</label>
			<input name="sender_email" type="email" bind:value={sender_email} />
		</div>

		<div>
			<label for="content">Content</label>
			<textarea name="content" bind:value={content} />
		</div>

		<input type="submit" value="Send" />
	</form>
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 30px;
		width: 50rem;

		border: 1px solid #ffffff66;
		padding: 5rem 5rem;
		border-radius: 10px;
	}

	h1 {
		letter-spacing: 12px;
	}

	label {
		font-size: 16px;
		font-family: "JetBrains Mono";
		font-weight: bold;
		letter-spacing: 4px;
	}

	form > div {
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	input {
		width: 100%;
		height: 1.5rem;
		outline: transparent;
		border: none;

		font-family: monospace;
		font-weight: bold;
		letter-spacing: 1px;
	}

	textarea {
		resize: none;
		width: 100%;
		height: 30vh;
	}

	input[type="submit"] {
		background-color: #ffffff66;
		padding: 0.5rem;
		height: auto;
		width: 50%;

		align-self: center;
		border-radius: 5px;
		cursor: pointer;

		font-family: monospace;
		font-size: 20px;
		font-weight: bold;
		letter-spacing: 5px;

		transition: background-color 100ms;
	}

	input[type="submit"]:hover {
		background-color: #ffffff88;
	}
</style>
