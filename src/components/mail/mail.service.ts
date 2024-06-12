import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }
    
  sendMail() {
    try {
      this.mailerService
        .sendMail({
          to: "test@nestjs.com",
          from: "noreply@nestjs.com",
          subject: "Testing Nest Mailermodule with template ✔",
          template: "welcome", // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
          context: {
            // Data to be sent to template engine.
            code: "cf1a3f828287",
            username: "john doe",
          },
        })
        .then(() => {})
        .catch(() => {});
    } catch (error) {
      throw error;
    }
  }
}
