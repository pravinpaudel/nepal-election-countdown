import { NextRequest, NextResponse } from "next/server";
import { SubscriberService } from "../../../services/subscriberService";

const subscriberService = new SubscriberService();

/**
 * To handle unsubscribe requests
 * @param request 
 * @returns A JSON response indicating success or failure along with a message
 * 
 * @example
 * // Request
 * POST /api/unsubscribe
 * {
 *   "email": "<user_email>"
 * }        
 */
export async function POST(request: NextRequest) {
    const { email } = await request.json();

    try{
        if (!email || typeof email !== "string") {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        const result = await subscriberService.unsubscribe(email);
        return NextResponse.json({ success: true, message: "Unsubscribed successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("❌ Error unsubscribing:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    
}