import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check,
  Crown,
  Zap,
  Star,
  Sparkles,
  Users
} from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "FREE TRIAL",
      description: "Perfect for trying MindLoom AI",
      price: "$0",
      period: "14 days",
      popular: false,
      features: [
        "5 content transformations per day",
        "Basic AI summaries",
        "Standard processing speed",
        "Email support",
        "Export to PDF"
      ],
      buttonText: "START FREE TRIAL",
      buttonVariant: "outline" as const,
      color: "text-muted-foreground"
    },
    {
      name: "PRO",
      description: "For power users and professionals",
      price: "$19",
      period: "per month",
      popular: true,
      features: [
        "Unlimited content transformations",
        "Advanced AI analysis",
        "Priority processing",
        "All export formats",
        "Legal document analysis",
        "Interactive mindmaps",
        "Podcast generation",
        "Priority support"
      ],
      buttonText: "UPGRADE TO PRO",
      buttonVariant: "brutal" as const,
      color: "text-primary"
    },
    {
      name: "ENTERPRISE",
      description: "For teams and organizations",
      price: "$99",
      period: "per month",
      popular: false,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom AI models",
        "API access",
        "Dedicated support",
        "SSO integration",
        "Custom branding",
        "Analytics dashboard"
      ],
      buttonText: "CONTACT SALES",
      buttonVariant: "warning" as const,
      color: "text-secondary"
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section header */}
        <div className="text-center space-y-8">
          <div className="bg-primary text-primary-foreground brutal-border brutal-shadow px-8 py-4 inline-block transform -rotate-1">
            <div className="flex items-center gap-3 text-lg font-black uppercase">
              <Crown className="w-6 h-6" />
              SIMPLE PRICING
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black leading-none">
            <div className="bg-foreground text-background brutal-border brutal-shadow-lg px-8 py-4 mb-4 transform rotate-1">
              TRANSFORM
            </div>
            <div className="bg-secondary text-secondary-foreground brutal-border brutal-shadow-lg px-8 py-4 mb-4 transform -rotate-1">
              WITHOUT
            </div>
            <div className="bg-accent text-accent-foreground brutal-border brutal-shadow-lg px-8 py-4 transform rotate-2">
              LIMITS
            </div>
          </h2>

          <div className="bg-muted brutal-border brutal-shadow px-8 py-6 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-bold uppercase leading-tight">
              START FREE, SCALE AS YOU GROW. NO HIDDEN FEES, NO SURPRISES.
              CANCEL ANYTIME.
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-background brutal-border brutal-shadow hover:brutal-shadow-lg transition-all duration-100 hover:-translate-y-2 relative ${
                plan.popular ? 'brutal-border-thick' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground brutal-border px-6 py-2 font-black uppercase">
                    <Star className="w-4 h-4 mr-2" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center space-y-6 p-8">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-black uppercase">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="font-bold uppercase text-sm">
                    {plan.description}
                  </CardDescription>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl md:text-5xl font-black">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground font-bold uppercase text-sm">
                      {plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-8 p-8 pt-0">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="bg-primary brutal-border p-1 mt-1">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-bold uppercase">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="w-full text-lg py-6 font-black uppercase"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-8">
          <div className="bg-secondary text-secondary-foreground brutal-border brutal-shadow px-8 py-4 inline-block transform rotate-1 mx-auto">
            <h3 className="text-2xl font-black uppercase">FREQUENTLY ASKED QUESTIONS</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <Card className="bg-background brutal-border brutal-shadow">
              <CardContent className="p-8">
                <h4 className="font-black uppercase mb-4 text-lg">Can I cancel anytime?</h4>
                <p className="text-sm font-bold text-muted-foreground">
                  YES! NO CONTRACTS, NO COMMITMENTS. CANCEL YOUR SUBSCRIPTION ANYTIME 
                  FROM YOUR ACCOUNT DASHBOARD.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-background brutal-border brutal-shadow">
              <CardContent className="p-8">
                <h4 className="font-black uppercase mb-4 text-lg">What file formats are supported?</h4>
                <p className="text-sm font-bold text-muted-foreground">
                  WE SUPPORT PDF, DOC, DOCX, TXT FILES, URLS, YOUTUBE VIDEOS, 
                  AND MORE. UPLOAD ALMOST ANY CONTENT TYPE.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-background brutal-border brutal-shadow">
              <CardContent className="p-8">
                <h4 className="font-black uppercase mb-4 text-lg">Is my data secure?</h4>
                <p className="text-sm font-bold text-muted-foreground">
                  ABSOLUTELY. WE USE ENTERPRISE-GRADE ENCRYPTION AND NEVER STORE 
                  YOUR DOCUMENTS LONGER THAN NECESSARY FOR PROCESSING.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-background brutal-border brutal-shadow">
              <CardContent className="p-8">
                <h4 className="font-black uppercase mb-4 text-lg">Do you offer team plans?</h4>
                <p className="text-sm font-bold text-muted-foreground">
                  YES! OUR ENTERPRISE PLAN INCLUDES TEAM COLLABORATION, 
                  CUSTOM MODELS, AND DEDICATED SUPPORT.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-8">
          <div className="bg-accent text-accent-foreground brutal-border brutal-shadow px-8 py-4 inline-block transform -rotate-1">
            <h3 className="text-2xl font-black uppercase">READY TO TRANSFORM?</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="brutal" size="lg" className="text-xl px-12 py-6 h-auto">
              <Sparkles className="w-6 h-6 mr-3" />
              START FREE TRIAL
            </Button>
            <Button variant="outline" size="lg" className="text-xl px-12 py-6 h-auto">
              <Users className="w-6 h-6 mr-3" />
              CONTACT SALES
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}