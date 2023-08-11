import type {
    AddressInfo,
} from 'net'
import net from 'net'

export async function getAvaliablePort(): Promise<number> {
	return new Promise((resolve,) => {
		const server = net.createServer()
		server.listen(0, () => {
			const addressInfo = server.address() as AddressInfo
			server.close(() => {
				return resolve(addressInfo.port,)
			},)
		},)
	},)
}