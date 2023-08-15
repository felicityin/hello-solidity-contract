# Install dependencies

```
yarn
```

# Compile

```
npx hardhat compile
```

# Test

```
npx hardhat test
```

# Deploy 

## Deploy contracts to Hardhat network

Start a local Hardhat node.
```
npx hardhat node
```

Deploy contracts to Hardhat network.
```
npx hardhat run scripts/deploy.ts --network localhost
```

## Deploy contracts to Axon network

```
npx hardhat run scripts/deploy.ts --network axon
```

# Reference

https://hardhat.org/hardhat-runner/docs/getting-started#quick-start
