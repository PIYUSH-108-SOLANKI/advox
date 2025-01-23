'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type AdMetric = {
  Date: string;
  Campaign_Name: string;
  Impressions: number;
  Clicks: number;
  Conversions: number;
  Ad_Cost: number;
  CPC: number;
  CPA: number;
  CTR: string;
  CVR: string;
}

export default function Visualization() {
  const [data, setData] = useState<AdMetric[]>([]);
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');

  useEffect(() => {
    fetch('/get_csv_data')
      .then(response => response.json())
      .then(jsonData => {
        const parsedData = jsonData.map((item: any) => ({
          ...item,
          Impressions: parseInt(item.Impressions),
          Clicks: parseInt(item.Clicks),
          Conversions: parseInt(item.Conversions),
          Ad_Cost: parseFloat(item.Ad_Cost),
          CPC: parseFloat(item.CPC),
          CPA: parseFloat(item.CPA),
          CTR: parseFloat(item.CTR.replace('%', '')),
          CVR: parseFloat(item.CVR.replace('%', ''))
        }));
        setData(parsedData);
        const uniqueCampaigns = Array.from(new Set(parsedData.map((item: AdMetric) => item.Campaign_Name)));
        setCampaigns(uniqueCampaigns);
        setSelectedCampaign(uniqueCampaigns[0]);
      });
  }, []);

  const filteredData = data.filter(item => item.Campaign_Name === selectedCampaign);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">AdVox Data Visualization</h1>
        <div className="mb-8">
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map(campaign => (
                <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-gray-700">
            <CardHeader>
              <CardTitle>Impressions Over Time</CardTitle>
              <CardDescription>Daily impressions for the selected campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  impressions: {
                    label: "Impressions",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="Date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="Impressions" stroke="#ff6b6b" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-gray-700">
            <CardHeader>
              <CardTitle>Clicks vs Conversions</CardTitle>
              <CardDescription>Comparison of clicks and conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  clicks: {
                    label: "Clicks",
                    color: "hsl(var(--chart-2))",
                  },
                  conversions: {
                    label: "Conversions",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="Date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="Clicks" fill="#4a9ff5" />
                    <Bar dataKey="Conversions" fill="#2c7be5" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-gray-700">
            <CardHeader>
              <CardTitle>Cost Per Click (CPC) Trend</CardTitle>
              <CardDescription>Daily CPC trend for the selected campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cpc: {
                    label: "CPC",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="Date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="CPC" stroke="#cc2366" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-gray-700">
            <CardHeader>
              <CardTitle>CTR and CVR Comparison</CardTitle>
              <CardDescription>Click-Through Rate and Conversion Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ctr: {
                    label: "CTR",
                    color: "hsl(var(--chart-5))",
                  },
                  cvr: {
                    label: "CVR",
                    color: "hsl(var(--chart-6))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="Date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="CTR" stroke="#ff6b6b" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="CVR" stroke="#4a9ff5" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

