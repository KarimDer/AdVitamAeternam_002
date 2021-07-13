import { createContext, useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';

export const IpfsContext = createContext();

export const IpfsContextProvider = ({ children }) => {
  const [ipfs, setIpfs] = useState();

  const projectId = 'XXXXXX';
  const projectSecret = 'XXXXXX';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  useEffect(() => {
    async function fetchData() {
      const client =  create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: 'https',
      });
      setIpfs(client);
      console.log('hello');
    }
    fetchData();
  }, []);

  async function addMetadata(metadata) {
    const cid = await ipfs.pin.add(
      {
        path: `metadata.json`,
        content: metadata,
        mtime: new Date(),
      },
      { wrapWithDirectory: true, cidVersion: 1, hashAlg: 'sha2-256' }
    );
    return cid.cid.string;
  }

  async function addFile(file) {
    const cid = await ipfs.add(
      {
        path: `${file.name}`,
        content: file,
        mtime: new Date(),
      },
      { wrapWithDirectory: true, cidVersion: 1, hashAlg: 'sha2-256' }
    );
    return cid.cid.string;
  }

  async function getURLofImageFromCid(cid) {
    try {
      for await (const file of ipfs.ls(cid)) {
        let filePath = file.path.replace(/^/, 'https://dweb.link/ipfs/');
        return filePath;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getMetadataFromCid(cid) {
    try {
      const data = await ipfs.cat(cid + '/metadata.json');
      for await (const file of data) {
        return new TextDecoder().decode(file);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <IpfsContext.Provider
      value={{
        ipfs,
        addMetadata,
        getMetadataFromCid,
        addFile,
        getURLofImageFromCid,
      }}
    >
      {children}
    </IpfsContext.Provider>
  );
};
