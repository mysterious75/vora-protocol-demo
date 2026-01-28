# VORA Protocol Demo

<p align="center">
  <img src="docs/assets/vora_logo.jpeg" width="160" alt="VORA Protocol Logo" />
</p>


## Overview
The VORA Protocol Demo provides a minimal, security-focused demonstration of the core concepts behind the VORA photo authenticity protocol. This demo is intended for evaluation, developer education, and internal review by companies and technical teams.

> **NOT FOR PRODUCTION USE**
>
> This demo is strictly for demonstration and testing. It omits critical security, upgradeability, and enterprise features required for real-world deployments. Do not use this code in production or commercial environments.

## What This Demo Includes
- Minimal smart contract (`PhotoAuthenticatorDemo.sol`) for registering and verifying photo hashes
- Simple batch registration (max 10 per call)
- No admin, fee, or upgrade logic
- No advanced metadata or oracle integrations
- Example scripts and tests for basic flows

## How to Run the Demo

1. **Install dependencies** (from project root):
   ```bash
   npm install
   ```
2. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```
3. **Run the demo script:**
   ```bash
   npx hardhat run demo/scripts/demo.js
   ```
4. **Run the test suite:**
   ```bash
   npx hardhat test demo/test/demo.test.js
   ```

## Security Notice
- This demo omits many protections present in the full VORA Protocol
- No access control or pausing
- No production-grade metadata validation
- No upgrade or recovery features
- Not audited for mainnet or commercial use

## Commercial License & Contact

Commercial use, redistribution, or integration of VORA Protocol technology requires a commercial license.

- **Contact:** [vedkumar755@gmail.com]
- **Subject:** "Commercial License Inquiry"
- Please include your company name, intended use, and contact details.

---

© 2026 VORA Protocol. All rights reserved.
