import EmergencyRequest from "../../DB/models/EmergencyRequest.model.js"

export default (io, socket) => {
    const userId = socket.handshake.user._id.toString()

    const joinResponderListener = payload => {
        socket.join(payload.requestedBy._id) // joining technician's socket to user's room
    }

    const responderLeaveListener = payload => {
        socket.leave(payload)
    }

    const responderLocationChangedListener = async payload => {
        try {
            const room = (await EmergencyRequest.findById(payload.requestId)).requestedBy.toString()

            socket.to(room).emit('request:responder-coord-update', payload.coords)
        } catch (err) {
            console.log(err);
        }
    }

    socket.on('request:responder-join', joinResponderListener)
    socket.on('request:responder-leave', responderLeaveListener)
    socket.on('request:responder-location-changed', responderLocationChangedListener)
}