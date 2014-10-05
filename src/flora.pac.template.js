// Generated by: https://github.com/lwr/FloraPacNJS

var proxies = [/*[proxies]*/];
var domains = {/*{domains}*/};
var ips = [/*[ips]*/];

// noinspection JSUnusedGlobalSymbols, JSUnusedLocalSymbols
/**
 * @return {string}
 */
function FindProxyForURL(url, host) {

    return proxies[findDomain() || findIp() || 3];

    function findDomain() {
        for (var domain = host; ;) {
            var i = domains[domain];
            if (i) {
                return i;
            }
            var dot = domain.indexOf('.');
            if (dot < 0) {
                // plain host or undefined
                return (host == domain) ? 1 : 0;
            }
            domain = domain.substr(dot + 1);
        }
    }


    function ip4ToInt(ipv4) {
        var b = ipv4.split('.', 4);
        return (b.length == 4)
                && (b[0] >= 0 && b[0] <= 255)
                && (b[1] >= 0 && b[1] <= 255)
                && (b[2] >= 0 && b[2] <= 255)
                && (b[3] >= 0 && b[3] <= 255)
                ? ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3]) >>> 0 : null;
    }


    function findIp() {
        // noinspection JSUnresolvedFunction
        var intIp = ip4ToInt(host);
        var hostIsIp = (intIp != null);
        if (!hostIsIp) {
            intIp = ip4ToInt(dnsResolve(host) || "");
            if (intIp == null) {
                return 0;
            }
        }

        var left = 0, right = ips.length;
        do {
            var mid = Math.floor((left + right) / 2);
            if (intIp < ips[mid][0]) {
                right = mid;
            } else if (intIp >= ips[mid][0] + ips[mid][1]) {
                left = mid + 1;
            } else {
                var result = ips[mid][2] || 2; // default is normalIps
                // pass through fake ip (like 127.0.0.1) direct accessing
                return (hostIsIp && result == 4) ? 1 : result;
            }
        } while (left + 1 <= right);
        return 0;
    }
}
