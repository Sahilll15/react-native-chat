function getLocalIPAddress() {
    return new Promise((resolve, reject) => {
        const peerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

        if (!peerConnection) {
            reject(new Error('RTCPeerConnection API is not supported by this browser'));
            return;
        }

        const pc = new peerConnection({ iceServers: [] });
        pc.createDataChannel('');

        pc.onicecandidate = (ice) => {
            if (!ice || !ice.candidate || !ice.candidate.candidate) {
                // End of candidate gathering.
                pc.close();
                return;
            }

            const ipAddress = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.exec(ice.candidate.candidate)[0];
            resolve(ipAddress);
            pc.close();
        };

        pc.createOffer()
            .then((offer) => pc.setLocalDescription(offer))
            .catch((error) => reject(error));
    });
}

// Example usage:
getLocalIPAddress()
    .then((ipAddress) => {
        console.log('Local IP address:', ipAddress);
    })
    .catch((error) => {
        console.error('Error getting local IP address:', error);
    });
