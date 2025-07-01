import { JSX } from "react";


import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, CardAction } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import staticContent from "@lib/content/staticContent.json";

export default function AuthCard({
    context,
    toggleContext
}:{
    context: "login" | "signup"
    toggleContext: () => void
}): JSX.Element {
    const content = staticContent.authCard[context];
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>
                    {content.description}
                </CardDescription>
                <CardAction>
                    {/* TODO: Add alt button, most probably it should be a close button */}
                    {/* <Button variant="link">Sign Up</Button> */}
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        {/* <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" required />
                        </div> */}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    {content.button}
                </Button>
                <Button variant="outline" className="w-full" onClick={toggleContext}>
                    {content.altButton}
                </Button>
            </CardFooter>
        </Card>
    )
}