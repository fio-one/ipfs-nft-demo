import { create } from 'ipfs-http-client';

async function upload(data) {
  const client = create({
    url: 'https://ipfs.infura.io:5001',
  });

  const file = await client.add(data);
  return file;
}

export default upload;
