import SocketResponse from "../../../helpers/response-socket";
import getDataFromRequest from "../../../helpers/extract-data";
const SocketHandler=(that)=>{
    that.socketRouter.use((req, res, next) => {
        req.authAdminToken=that.authAdminToken
        req.daynverServerUrl=that.daynverServerUrl
        req.authServerUrl=that.authServerUrl
        req.databaseServerUrl=that.databaseServerUrl
        req.mailServerUrl=that.mailServerUrl
        req.phoneServerUrl=that.phoneServerUrl
        req.storageServerUrl=that.storageServerUrl
        req.cronServerUrl=that.cronServerUrl

        req.io = that.io;
        req.privateSocket = that.privateSocket;
        req.publicSocket = that.publicSocket;
        req.ioJwt = that.verify
        req.ioUser = that.user
        req.eventEmitter = that.eventEmitter
        req.entitySchema=that.entitySchema

        req.acebaseClient=that.acebaseClient
        next()
    })
    that.socketRouter.use('/', (req, res) => {
        let {
            data,
            path,
            listen,
            socket,
            response,
            result,
            extras
        } = getDataFromRequest(req)

        if(!data?.data){
            result.error={
                code:400,
                message:'You did not set your Json request correctly, it should be data={socket,data}'
            }
        }


        if(socket){
            if(result.error){
                response.error={}
                response.error.testAuth=result.error
                socket.emit(listen+path,SocketResponse.error(response))
            }else {
                data={
                    message:'Hi, Welcome to Swyger Storage - API!'
                }
                response.data={
                    data
                }
                socket.emit(listen+path,SocketResponse.success(response))

            }

        }

    });
}
export default SocketHandler