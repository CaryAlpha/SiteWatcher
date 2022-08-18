
const projects = require('./watchList.json');
const dns = require("dns");

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

async function checkDNS(domain) {
    const state = await new Promise((resolve, reject) => {
        dns.resolve(domain, (err, result) => {
            resolve({
            err,
            result
            });
        });
    });

    if (state.err) return 
    console.log(domain, state.result)
}

async function scanAll() {
    for (let index = 0; index < projects.length; index++) {
        const project = projects[index];
        try {
            await checkDNS(project.domains[0]);
        } catch(e) {
            console.log('error', e)
        }
        await wait(1000)
    }
}


scanAll();