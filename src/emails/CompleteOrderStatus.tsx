import React from "react";
import {
 Body,
 //  Button,
 Container,
 Head,
 Heading,
 Hr,
 Html,
 Link,
 Preview,
 Row,
 Section,
 Text,
} from "@react-email/components";

interface CompleteOrderStatusProps {
 email?: string;
 time: number;
}

const baseUrl = process.env.BASE_URL
 ? `${process.env.BASE_URL}`
 : "http://localhost:3000";

export const CompletedOrderEmail = ({
 email,
 time,
}: CompleteOrderStatusProps) => (
 <Html>
  <Head />
  <Preview>Your login code for AuthJs Template</Preview>
  <Body style={main}>
   <Container style={container}>
    <Row>
     <Heading as="h2">Hello {email},</Heading>
    </Row>
    <Section>
     <Text style={text}>
      This link and code will only be valid for the next {time} minutes. If the
      link does not work, you can copy and paste the following URL into your
      browser:
     </Text>
     <code style={code}>Some text here</code>
     <Hr style={hr} />
     <Link href={baseUrl} style={reportLink}>
      AuthJs Template
     </Link>
    </Section>
   </Container>
  </Body>
 </Html>
);

export default CompletedOrderEmail;

const main = {
 backgroundColor: "#f6f9fc",
 padding: "10px 0",
};

const container = {
 backgroundColor: "#ffffff",
 border: "1px solid #f0f0f0",
 padding: "45px",
};

const text = {
 fontSize: "16px",
 fontFamily:
  "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
 fontWeight: "300",
 color: "#404040",
 lineHeight: "26px",
};

// const button = {
//  backgroundColor: "#2e026d",
//  borderRadius: "4px",
//  fontWeight: "600",
//  color: "#fff",
//  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
//  fontSize: "15px",
//  textDecoration: "none",
//  textAlign: "center" as const,
//  display: "block",
//  padding: "11px 23px",
// };

const reportLink = {
 fontSize: "14px",
 color: "#b4becc",
};

const hr = {
 borderColor: "#dfe1e4",
 margin: "42px 0 26px",
};

const code = {
 fontFamily: "monospace",
 fontWeight: "700",
 padding: "1px 4px",
 backgroundColor: "#dfe1e4",
 letterSpacing: "-0.3px",
 fontSize: "21px",
 borderRadius: "4px",
 color: "#3c4149",
};
