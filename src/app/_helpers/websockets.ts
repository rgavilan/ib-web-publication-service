/** 
 * possible states for the STOMP service 
 */
export enum STOMPState {
  /**
   * Cerrado
   */
  CLOSED,
  /**
   * Intentando la conexión.
   */
  TRYING,
  /**
   * Reintentando la conexión.
   */
  RETRYING,
  /**
   * Conectado.
   */
  CONNECTED,
  /**
   * Desconectando.
   */
  DISCONNECTING
}

/**
 * Mensaje para el envío de datos de usuario.
 */
export class UserMessage {
    name: string;
}
