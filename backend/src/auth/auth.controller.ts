import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import * as passport from 'passport';

@Controller()
export class AuthController {
  @Get('oauth2/google')
  async handleOAuthGoogleRequest(@Req() req: any, @Res() res: any, @Next() next: any): Promise<void> {
    this.handleOAuthRequest(req, res, next, 'oauth2-google');
  }

  @Get('oauth2/facebook')
  async handleOAuthFacebookRequest(@Req() req: any, @Res() res: any, @Next() next: any): Promise<void> {
    this.handleOAuthRequest(req, res, next, 'oauth2-facebook');
  }

  @Get('logout')
  async logout(@Req() req: any, @Res() res: any): Promise<void> {
    res.clearCookie('AuthToken', { secure: true, httpOnly: true });
    res.redirect('/');
  }

  @Get('oauth2/google/callback')
  async handleOAuthGoogleCallback(@Req() req: any, @Res() res: any, @Next() next: any): Promise<void> {
    await this.handleCallback(req, res, next, 'oauth2-google');
  }

  @Get('oauth2/facebook/callback')
  async handleOAuthFacebookCallback(@Req() req: any, @Res() res: any, @Next() next: any): Promise<void> {
    await this.handleCallback(req, res, next, 'oauth2-facebook');
  }

  private handleOAuthRequest(req: any, res: any, next: any, oauthStrategy: string): Promise<void> {
    const params: passport.AuthenticateOptions = {
      session: false,
    };
    if (req.query['redirect_url'] && typeof req.query['redirect_url'] === 'string') {
      params.state = req.query['redirect_url'];
    }
    return passport.authenticate(oauthStrategy, params)(req, res, next);
  }

  private handleCallback(req: any, res: any, next: any, oauthStrategy: string): Promise<void> {
    const params: passport.AuthenticateOptions = {
      session: false,
      state: req.query.state as string,
    };

    return passport.authenticate(oauthStrategy, params, (err, user) => {
      if (err || !user) {
        if (err) {
          console.log(err);
        }
        res.redirect('/');
      } else {
        this.generateTokenAndRedirect(req, res, user);
      }
    })(req, res, next);
  }

  private generateTokenAndRedirect(req: any, res: any, user: any): void {
    res.cookie('AuthToken', user.token, { secure: true, httpOnly: true });
    res.redirect(req.query.state || '/app');
  }
}
