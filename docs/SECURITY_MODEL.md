# SECURITY MODEL (DEMO)

## Threat Model
- The demo assumes an honest developer and test environment.
- No protection against malicious users, reentrancy, or DoS attacks.
- No on-chain or off-chain oracles are used.
- No access control or pausing is implemented in the demo.

## Hash Immutability
- Once a photo hash is registered, it cannot be changed or overwritten.
- This ensures that the original registration is a permanent, tamper-evident record.
- Immutability is enforced by the contract's mapping and registration logic.

## Admin Verification Role
- In the demo, any user can call `verifyPhoto` (no admin logic).
- In production, only authorized admins can verify authenticity.
- Verification is a one-way flag: once set, it cannot be unset.

## Replay Resistance Concept
- Each photo hash can only be registered once.
- Duplicate registration is rejected, preventing replay of the same hash.
- This protects against replay attacks and accidental double-registration.

## What Is Intentionally Omitted in Demo
- No access control (anyone can register/verify)
- No pausing, upgradability, or emergency recovery
- No advanced metadata validation or signature checks
- No fee, payment, or economic logic
- No integration with oracles or external data sources
- No protection against gas griefing or DoS

---

This document describes the demo's high-level security posture. The full VORA Protocol includes additional controls, protections, and compliance features not present in this demo.
