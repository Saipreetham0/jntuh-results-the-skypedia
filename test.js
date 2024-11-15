const axios = require('axios');

async function testProxy(proxy) {
    try {
        const response = await axios.get("http://httpbin.org/ip", {
            proxy,
            timeout: 5000
        });
        if (response.status === 200) {
            console.log(`Proxy %O is working. Your IP: ${response.data.origin}`, proxy);
        } else {
            console.log(`Proxy %O returned status code ${response.status}`, proxy);
        }
    } catch (error) {
        console.log(`Error occurred while testing proxy %O: ${error.message}`, proxy);
    }
}

async function main() {
    const proxy = {
        host: 'proxy.toolip.io',
        port: '31112',
        auth: {username: '8c5906b99fbd1c0bcd0f916d545c565a294fa18417499a6b43babf4c07a63a5b376a6e57c8fe6374336efa7732b34fe03eb6db89c17b3d5907c671770cc67ea3d59b066f8696adba47c3e6e3a1d06603', password: 'o2dyouia1i7b'},
    };
    await testProxy(proxy);
}

main();
