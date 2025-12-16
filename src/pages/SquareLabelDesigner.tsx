import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Type, Wand2, ArrowLeft } from 'lucide-react';
import { ClipartPicker } from '@/components/ClipartPicker';

const colors = [
  { name: 'Blue', value: '#3B82F6', bg: 'bg-blue-500' },
  { name: 'Green', value: '#10B981', bg: 'bg-green-500' },
  { name: 'Pink', value: '#EC4899', bg: 'bg-pink-500' },
  { name: 'Purple', value: '#A855F7', bg: 'bg-purple-500' },
  { name: 'Orange', value: '#F97316', bg: 'bg-orange-500' },
  { name: 'Yellow', value: '#EAB308', bg: 'bg-yellow-500' },
  { name: 'Red', value: '#EF4444', bg: 'bg-red-500' },
  { name: 'Teal', value: '#14B8A6', bg: 'bg-teal-500' },
];

const backgrounds = [
  { name: 'White', value: '#FFFFFF', bg: 'bg-white' },
  { name: 'Light Blue', value: '#DBEAFE', bg: 'bg-blue-100' },
  { name: 'Light Green', value: '#D1FAE5', bg: 'bg-green-100' },
  { name: 'Light Pink', value: '#FCE7F3', bg: 'bg-pink-100' },
  { name: 'Light Yellow', value: '#FEF3C7', bg: 'bg-yellow-100' },
];

const fonts = [
  { name: 'Fun', value: 'Comic Sans MS, cursive' },
  { name: 'Bold', value: 'Arial Black, sans-serif' },
  { name: 'Round', value: 'Nunito, sans-serif' },
  { name: 'Scribble', value: 'Kalam, cursive' },
];

export default function SquareLabelDesigner() {
  const [labelData, setLabelData] = useState({
    name: '',
    clipart: '🚗',
    textColor: colors[0].value,
    backgroundColor: backgrounds[0].value,
    font: fonts[0].value,
    showClipart: true,
  });

  const updateLabel = (field: string, value: any) => {
    setLabelData(prev => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  // Column configuration: odd columns (1,3,5,7) have 3 squares of 3cm, even columns (2,4,6) have 4 squares of 2.1cm
  const columns = [
    { count: 3, size: '3cm' },    // Column 1
    { count: 4, size: '2.1cm' },  // Column 2
    { count: 3, size: '3cm' },    // Column 3
    { count: 4, size: '2.1cm' },  // Column 4
    { count: 3, size: '3cm' },    // Column 5
    { count: 4, size: '2.1cm' },  // Column 6
    { count: 3, size: '3cm' },    // Column 7
  ];

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/products')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Design Your <span className="text-gradient-gold">Square Labels</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your own personalized square labels! Make them fun and unique! 🎨
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Design Controls */}
            <div className="space-y-6">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
                      <Type className="w-5 h-5 text-primary" />
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      value={labelData.name}
                      onChange={(e) => updateLabel('name', e.target.value)}
                      className="text-lg"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Clipart Selection */}
                  <ClipartPicker
                    selectedClipart={labelData.clipart}
                    onSelect={(emoji) => updateLabel('clipart', emoji)}
                    showClipart={labelData.showClipart}
                    onToggleShow={(show) => updateLabel('showClipart', show)}
                  />

                  {/* Text Color */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" />
                      Text Color
                    </Label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => updateLabel('textColor', color.value)}
                          className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                            labelData.textColor === color.value
                              ? 'border-primary scale-110 ring-2 ring-primary ring-offset-2'
                              : 'border-border hover:border-primary/50'
                          } ${color.bg}`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Wand2 className="w-5 h-5 text-primary" />
                      Background Color
                    </Label>
                    <div className="grid grid-cols-5 gap-3">
                      {backgrounds.map((bg) => (
                        <button
                          key={bg.name}
                          onClick={() => updateLabel('backgroundColor', bg.value)}
                          className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                            labelData.backgroundColor === bg.value
                              ? 'border-primary scale-110 ring-2 ring-primary ring-offset-2'
                              : 'border-border hover:border-primary/50'
                          } ${bg.bg}`}
                          style={{ backgroundColor: bg.value }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font Selection */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Type className="w-5 h-5 text-primary" />
                      Font Style
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {fonts.map((font) => (
                        <button
                          key={font.name}
                          onClick={() => updateLabel('font', font.value)}
                          className={`px-4 py-2 rounded-lg border-2 text-left transition-all ${
                            labelData.font === font.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{ fontFamily: font.value }}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Preview */}
            <div className="space-y-6">
              <Card className="border-2 border-primary/20 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center">Preview</h2>
                  <div className="flex items-start justify-center min-h-[400px] p-4 gap-2 overflow-x-auto">
                    {/* 7 columns with alternating sizes */}
                    {columns.map((col, colIndex) => (
                      <div key={`col-${colIndex}`} className="flex flex-col gap-2 items-center">
                        {[...Array(col.count)].map((_, i) => (
                          <div
                            key={`square-${colIndex}-${i}`}
                            className="border-4 border-gray-300 shadow-lg flex flex-col items-center justify-center p-2 transition-all rounded-md"
                            style={{
                              width: col.size,
                              height: col.size,
                              backgroundColor: labelData.backgroundColor,
                              fontFamily: labelData.font,
                            }}
                          >
                            {labelData.showClipart && (
                              <span className={col.size === '3cm' ? 'text-xl mb-1' : 'text-base'}>
                                {labelData.clipart}
                              </span>
                            )}
                            <span
                              className={`font-bold text-center leading-tight ${col.size === '3cm' ? 'text-xs' : 'text-[8px]'}`}
                              style={{ color: labelData.textColor }}
                            >
                              {labelData.name || 'Your Name'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {labelData.name && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button variant="gold" size="lg" className="w-full">
                        Add to Cart
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
