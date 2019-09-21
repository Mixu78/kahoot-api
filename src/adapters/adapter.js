import Emitter from 'tiny-emitter';

/**
 * Class used as a base for all adapters
 *
 * @export
 * @class Adapter
 * @extends {Emitter}
 */
export default class Adapter extends Emitter {
  /**
   * Creates an instance of Adapter.
   *
   * @param {CometD} socket
   * @memberof Adapter
   */
  constructor(socket) {
    super();

    this.socket = socket;
  }

  /**
   * Send data over the socket
   *
   * @param {String} channel - CometD channel
   * @param {Object} [data={}]
   * @returns {Promise}
   * @memberof Adapter
   */
  send(channel, data = {}) {
    const final = data;
    return new Promise((resolve) => {
      if (!this.socket.isDisconnected()) {
        final.host = 'kahoot.it';
        final.gameid = this.socket.info.pin;
        this.socket.publish(channel, final, resolve);
      } else {
        resolve();
      }
    });
  }
}
