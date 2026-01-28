const { expect } = require("chai");

describe("PhotoAuthenticatorDemo", function () {
  let contract, deployer, user;
  const sampleMeta = JSON.stringify({ device: "demo", ts: 1 });

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("PhotoAuthenticatorDemo");
    contract = await Factory.deploy();
    await contract.deployed?.();
  });

  it("deploys", async () => {
    expect(await contract.totalPhotos()).to.equal(0);
  });

  it("registers a photo", async () => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("photo1"));
    await expect(contract.registerPhoto(hash, sampleMeta))
      .to.emit(contract, "PhotoRegistered");
    expect(await contract.isRegistered(hash)).to.be.true;
    expect((await contract.getPhoto(hash)).photographer).to.equal(deployer.address);
  });

  it("rejects duplicate registration", async () => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("photo2"));
    await contract.registerPhoto(hash, sampleMeta);
    await expect(contract.registerPhoto(hash, sampleMeta)).to.be.revertedWith("Already registered");
  });

  it("verifies a photo", async () => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("photo3"));
    await contract.registerPhoto(hash, sampleMeta);
    await expect(contract.verifyPhoto(hash)).to.emit(contract, "PhotoVerified");
    expect((await contract.getPhoto(hash)).isVerified).to.be.true;
    expect(await contract.isAuthentic(hash)).to.be.true;
  });

  it("query functions work", async () => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("photo4"));
    await contract.registerPhoto(hash, sampleMeta);
    const photo = await contract.getPhoto(hash);
    expect(photo.photoHash).to.equal(hash);
    expect(photo.photographer).to.equal(deployer.address);
    expect(photo.isVerified).to.be.false;
    expect(await contract.isAuthentic(hash)).to.be.false;
  });

  it("allows anyone to call (no pause protection in demo)", async () => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("photo5"));
    await contract.connect(user).registerPhoto(hash, sampleMeta);
    await contract.connect(user).verifyPhoto(hash);
    expect((await contract.getPhoto(hash)).isVerified).to.be.true;
  });
});
