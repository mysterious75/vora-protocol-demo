const hre = require("hardhat");
const { ethers } = hre;

async function main() {
	// 1. Deploy contract
	const [deployer] = await ethers.getSigners();
	console.log("Deploying PhotoAuthenticatorDemo with:", deployer.address);
	const Factory = await ethers.getContractFactory("PhotoAuthenticatorDemo");
	const contract = await Factory.deploy();
	await contract.deployed?.();
	const address = contract.address || (await contract.getAddress());
	console.log("Deployed at:", address);

	// 2. Register a sample photo hash
	const photoData = {
		timestamp: Math.floor(Date.now() / 1000),
		deviceId: "DEMO_CAM_1",
		location: "0,0",
		note: "demo photo"
	};
	const photoInput = JSON.stringify(photoData) + Math.random().toString();
	const photoHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(photoInput));
	const metadata = JSON.stringify(photoData);
	const regTx = await contract.registerPhoto(photoHash, metadata);
	await regTx.wait();
	console.log("Photo registered:", photoHash);

	// 2.5. Batch register demo (max 10 entries)
	const batchHashes = [];
	const batchMetadatas = [];
	for (let i = 1; i <= 10; i++) {
		const batchInput = `batch-photo-${i}` + Math.random().toString();
		const batchHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(batchInput));
		const batchMetadata = JSON.stringify({ note: `batch demo photo ${i}` });
		batchHashes.push(batchHash);
		batchMetadatas.push(batchMetadata);
	}
	const batchTx = await contract.batchRegister(batchHashes, batchMetadatas);
	await batchTx.wait();
	console.log("Batch registration (max 10) demo complete");

	// 3. Verify as admin (anyone can in demo)
	const verifyTx = await contract.verifyPhoto(photoHash);
	await verifyTx.wait();
	console.log("Photo verified:", photoHash);

	// 4. Query authenticity
	const authentic = await contract.isAuthentic(photoHash);
	console.log("Authenticity:", authentic ? "AUTHENTIC" : "NOT AUTHENTIC");

	// 5. Print clean output
	const photo = await contract.getPhoto(photoHash);
	console.log("Photographer:", photo.photographer);
	console.log("Timestamp:", photo.timestamp.toString());
	console.log("Verified:", photo.isVerified);

	// 6. Exit gracefully
	if (hre.ethers.provider && typeof hre.ethers.provider.destroy === 'function') {
		await hre.ethers.provider.destroy();
	}
	process.exit(0);
}

main().catch(async (err) => {
	console.error("Error:", err);
	if (hre.ethers.provider && typeof hre.ethers.provider.destroy === 'function') {
		await hre.ethers.provider.destroy();
	}
	process.exit(1);
});
