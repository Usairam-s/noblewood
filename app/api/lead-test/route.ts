import { NextResponse } from 'next/server';

export async function GET() {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetLeads xmlns="https://service.leads360.com">
      <username>Oliver@golddepotira.com</username>
      <password>hockyf-myFqag-1waqgo</password>
      <from>2026-03-26T00:00:00</from>
      <to>2026-03-30T23:59:59</to>
    </GetLeads>
  </soap:Body>
</soap:Envelope>`;

  try {
    const response = await fetch('https://us-east-1-service.prod.velocify.com/ClientService.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'https://service.leads360.com/GetLeads',
      },
      body: soapRequest,
    });

    const data = await response.text();
    
    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
