import { ethers } from 'ethers';

export const returnAllIds = async ({ contract }) => {
  let galleryOfId = [];
  const iterateTroughtBalance = async () => {
    const totalSupply = await contract.totalSupply();
    for (let i = 1; i <= totalSupply; i++) {
      let id = await contract.tokenByIndex(i);
      galleryOfId.push(id);
    }
    await iterateTroughtBalance();
    return galleryOfId;
  };
};


