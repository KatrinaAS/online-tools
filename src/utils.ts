export function hexToData(hex:string) {
    var bytes = [];
    if (!hex.match(/^[0-9a-fA-F]+$/)) {
        throw new Error('is not a hex string.');
        // return bytes;
    }
    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }

    for (var n = 0; n < hex.length; n += 2) {
        var code = parseInt(hex.substr(n, 2), 16)
        bytes.push(code);
    }
    return bytes;
}

export function hash(data:Uint8Array) {
    return crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
}

export async function hash_sha256d(data:Uint8Array) {
    return await hash(new Uint8Array(hexToData(await hash(data))));
}

export function buf2hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

export function getRandomExtraNonce2(length: number) {
    if (length <=0)
        return "";
    let randArray= new Uint8Array(length);
    console.log('Length:',length);
    console.log('Rand array length 1',randArray.length);
    crypto.getRandomValues(randArray);
    console.log('Rand array ',randArray);
    console.log('Rand array length 2',randArray.length);
    return buf2hex(randArray.buffer);
}

export async function calculateRoot(merkleTree: Array<string>,coinb1:string,extranonce2:string,coinb2:string) {

}