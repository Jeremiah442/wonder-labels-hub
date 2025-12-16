import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Car, Bike, Gamepad2, Heart, Star, Trophy, Crown, Sparkles,
  Sun, Moon, Flower2, Dog, Cat, Bird, Fish,
  Palette, Type, Wand2, ArrowLeft
} from 'lucide-react';

const icons = [
  { name: 'Car', icon: Car, emoji: '🚗' },
  { name: 'Bike', icon: Bike, emoji: '🚲' },
  { name: 'Game', icon: Gamepad2, emoji: '🎮' },
  { name: 'Heart', icon: Heart, emoji: '❤️' },
  { name: 'Star', icon: Star, emoji: '⭐' },
  { name: 'Trophy', icon: Trophy, emoji: '🏆' },
  { name: 'Crown', icon: Crown, emoji: '👑' },
  { name: 'Sparkles', icon: Sparkles, emoji: '✨' },
  { name: 'Sun', icon: Sun, emoji: '☀️' },
  { name: 'Moon', icon: Moon, emoji: '🌙' },
  { name: 'Flower', icon: Flower2, emoji: '🌸' },
  { name: 'Dog', icon: Dog, emoji: '🐶' },
  { name: 'Cat', icon: Cat, emoji: '🐱' },
  { name: 'Bird', icon: Bird, emoji: '🐦' },
  { name: 'Fish', icon: Fish, emoji: '🐠' },
];

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

export default function RectangularLabelDesigner() {
  const [labelData, setLabelData] = useState({
    name: '',
    icon: icons[0],
    textColor: colors[0].value,
    backgroundColor: backgrounds[0].value,
    font: fonts[0].value,
    showIcon: true,
  });

  const updateLabel = (field: string, value: any) => {
    setLabelData(prev => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const column1 = [
    { width: '5cm', height: '3cm' },
    { width: '5cm', height: '3cm' },
    { width: '5cm', height: '2cm' },
  ];
  const column2Ref = column1[2];
  const column2 = Array.from({ length: 4 }, () => ({ width: column2Ref.width, height: column2Ref.height }));
  const column3 = Array.from({ length: 7 }, () => ({ width: '3.3cm', height: '1cm' }));
  const column4 = [...column1];
  const bottomRow = Array.from({ length: 6 }, () => ({ width: '3.3cm', height: '1cm' }));

  const columns = [column1, column2, column3, column4];

  const textSizeFor = (h: string) => {
    if (h === '3cm') return 'text-xs';
    if (h === '2cm') return 'text-[10px]';
    return 'text-[8px]';
  };

  const iconSizeFor = (h: string) => {
    if (h === '3cm') return 'text-xl';
    if (h === '2cm') return 'text-base';
    return 'text-sm';
  };

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/products')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Design Your <span className="text-gradient-gold">Rectangular Labels</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your own personalized rectangular labels!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 space-y-6">
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

                  <div className="space-y-2">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Choose an Icon
                    </Label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                      {icons.map((iconOption) => (
                        <button
                          key={iconOption.name}
                          onClick={() => updateLabel('icon', iconOption)}
                          className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl transition-all hover:scale-110 ${
                            labelData.icon.name === iconOption.name
                              ? 'border-primary bg-primary/10 scale-110'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {iconOption.emoji}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="showIcon"
                        checked={labelData.showIcon}
                        onChange={(e) => updateLabel('showIcon', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <Label htmlFor="showIcon" className="cursor-pointer">
                        Show icon on label
                      </Label>
                    </div>
                  </div>

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

            <div className="space-y-6">
              <Card className="border-2 border-primary/20 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-center">Preview</h2>
                  <div className="flex items-start justify-center min-h-[400px] p-4 gap-4 overflow-x-auto">
                    {columns.map((col, colIndex) => (
                      <div key={`col-${colIndex}`} className="flex flex-col gap-2 items-center">
                        {col.map((rect, i) => (
                          <div
                            key={`rect-${colIndex}-${i}`}
                            className="border-4 border-gray-300 shadow-lg flex flex-col items-center justify-center p-2 transition-all rounded-md"
                            style={{
                              width: rect.width,
                              height: rect.height,
                              backgroundColor: labelData.backgroundColor,
                              fontFamily: labelData.font,
                            }}
                          >
                            {labelData.showIcon && (
                              <span className={`${iconSizeFor(rect.height)} mb-1`}>
                                {labelData.icon.emoji}
                              </span>
                            )}
                            <span
                              className={`font-bold text-center leading-tight ${textSizeFor(rect.height)}`}
                              style={{ color: labelData.textColor }}
                            >
                              {labelData.name || 'Your Name'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="-mt-2 flex items-center justify-center gap-2">
                    {bottomRow.map((rect, i) => (
                      <div
                        key={`bottom-${i}`}
                        className="border-4 border-gray-300 shadow-lg flex flex-col items-center justify-center p-1 transition-all rounded-md"
                        style={{
                          width: rect.width,
                          height: rect.height,
                          backgroundColor: labelData.backgroundColor,
                          fontFamily: labelData.font,
                        }}
                      >
                        {labelData.showIcon && (
                          <span className={`${iconSizeFor(rect.height)} mb-0.5`}>
                            {labelData.icon.emoji}
                          </span>
                        )}
                        <span
                          className={`font-bold text-center leading-tight ${textSizeFor(rect.height)}`}
                          style={{ color: labelData.textColor }}
                        >
                          {labelData.name || 'Name'}
                        </span>
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
