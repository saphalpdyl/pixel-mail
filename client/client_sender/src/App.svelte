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

				const data = await response.json();
				console.log(data);
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
			<input name="content" bind:value={content} />
		</div>

		<input type="submit" value="Send" />
	</form>
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 30px;

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
</style>
