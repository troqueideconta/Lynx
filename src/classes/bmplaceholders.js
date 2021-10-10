function rp(messages, realValues) {
    messages = new Map(Object.entries(messages));
    const replaced = {};
    messages.forEach((value, key) => {
        let placeholders = undefined;
        try {
            placeholders = value.match(/{[a-z,A-Z,\d]+}/gm);
        }
        catch {
            placeholders = false;
        }
        if (!placeholders) return replaced[key] = value;
        placeholders.forEach((v, i) => {
            value = value.replace(v, realValues[v.replace(/{|}/g, '').toLowerCase()] || v)
        })
        replaced[key] = value;
    })
    return replaced;
}

module.exports = rp;

