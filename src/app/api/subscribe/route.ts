import { NextResponse } from "next/server";
import * as SibApiV3Sdk from "@getbrevo/brevo";

export const runtime = "nodejs";

// Initialize API instance
const apiInstance = new SibApiV3Sdk.ContactsApi();

// Set API key
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { email, listIds = [2] } = await request.json(); // Replace 2 with your list ID

    // Create contact
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.listIds = listIds;
    createContact.updateEnabled = true;

    const data = await apiInstance.createContact(createContact);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
      data: data
    });
  } catch (error: any) {
    // Handle specific Brevo error codes
    if (error.status === 400 && error.response?.body?.message?.includes("Contact already exist")) {
      return NextResponse.json({
        success: false,
        message: "You're already subscribed!",
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: "Failed to subscribe. Please try again later.",
      error: error.message
    }, { status: 500 });
  }
}