declare module "nodemailer" {
  export type SendMailOptions = {
    from?: string;
    to?: string;
    replyTo?: string;
    subject?: string;
    html?: string;
    text?: string;
  };

  export type Transporter = {
    sendMail(options: SendMailOptions): Promise<unknown>;
  };

  const nodemailer: {
    createTransport(options: unknown): Transporter;
  };
  export default nodemailer;
}
