// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
pragma solidity ^0.8.20;

/// @notice DEMO ONLY — NOT FOR PRODUCTION USE
/// @dev Commercial use requires license from VORA Protocol

/**
 * @title PhotoAuthenticatorDemo
 * @dev Minimal demo contract for registering and verifying photo hashes.
 *      No upgradeability, admin extensions, fees, or advanced validation.
 *      For demonstration and test only.
 */
contract PhotoAuthenticatorDemo {
    // Max batch size for demo
    uint256 public constant MAX_BATCH_SIZE = 10;

    struct Photo {
        bytes32 photoHash;
        address photographer;
        uint256 timestamp;
        string metadata;
        bool isVerified;
    }

    mapping(bytes32 => Photo) public photos;
    mapping(bytes32 => bool) public isRegistered;
    uint256 public totalPhotos;

    event PhotoRegistered(bytes32 indexed photoHash, address indexed photographer, uint256 timestamp, string metadata);
    event PhotoVerified(bytes32 indexed photoHash, address indexed verifier, uint256 timestamp);

    // Register a photo (no advanced metadata validation)
    function registerPhoto(bytes32 photoHash, string calldata metadata) external {
        require(photoHash != bytes32(0), "Invalid hash");
        require(!isRegistered[photoHash], "Already registered");
        photos[photoHash] = Photo({
            photoHash: photoHash,
            photographer: msg.sender,
            timestamp: block.timestamp,
            metadata: metadata,
            isVerified: false
        });
        isRegistered[photoHash] = true;
        totalPhotos++;
        emit PhotoRegistered(photoHash, msg.sender, block.timestamp, metadata);
    }

    // Batch register (demo, gas-safe, no advanced checks)
    function batchRegister(bytes32[] calldata hashes, string[] calldata metadatas) external {
        require(hashes.length == metadatas.length, "Length mismatch");
        require(hashes.length > 0 && hashes.length <= MAX_BATCH_SIZE, "Batch size");
        for (uint256 i = 0; i < hashes.length; i++) {
            if (hashes[i] != bytes32(0) && !isRegistered[hashes[i]]) {
                photos[hashes[i]] = Photo({
                    photoHash: hashes[i],
                    photographer: msg.sender,
                    timestamp: block.timestamp,
                    metadata: metadatas[i],
                    isVerified: false
                });
                isRegistered[hashes[i]] = true;
                totalPhotos++;
                emit PhotoRegistered(hashes[i], msg.sender, block.timestamp, metadatas[i]);
            }
        }
    }

    // Verify a photo (anyone can verify in demo)
    function verifyPhoto(bytes32 photoHash) external {
        require(isRegistered[photoHash], "Not registered");
        photos[photoHash].isVerified = true;
        emit PhotoVerified(photoHash, msg.sender, block.timestamp);
    }

    // Get photo details
    function getPhoto(bytes32 photoHash) external view returns (Photo memory) {
        require(isRegistered[photoHash], "Not registered");
        return photos[photoHash];
    }

    // Check authenticity (simple flag)
    function isAuthentic(bytes32 photoHash) external view returns (bool) {
        return isRegistered[photoHash] && photos[photoHash].isVerified;
    }
}
