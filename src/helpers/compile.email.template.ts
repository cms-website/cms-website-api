import fs from 'fs';
import handlebars from 'handlebars';
import mjml2html from 'mjml';
import path from 'path';

type Props = {
  fileName: string;
  data: {
    titleName?: string;
    date?: string;
    username?: string;
    url?: string;
    email?: string;
    password?: string;
    teamName?: string;
    link?: string;
    status?: string;
    logo?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedIn?: string;
    mapUrl?: string;
    senderName?: string;
    supportMail?: string;
    address?: string;
    privacyPolicyUrl?: string;
    termsAndConditionsUrl?: string;
    contactUsUrl?: string;
    expirationTime?: string;
    startDate?:string;
    endDate?:string;
  };
};

export default async function compileEmailTemplate({
  fileName,
  data,
}: Props): Promise<string> {
  const mjMail = await fs.promises.readFile(
    path.join('src/email-templates', fileName),
    'utf8',
  );
  const template = mjml2html(mjMail).html;
  return handlebars.compile(template)(data).toString();
}
