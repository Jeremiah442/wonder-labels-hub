import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Type, Wand2, ArrowLeft, Save } from 'lucide-react';
import { ImagePicker } from '@/components/ImagePicker';
import { DesignerWorkspace } from '@/components/designer/DesignerWorkspace';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/lib/cart';
import { ImagePositionPicker, defaultImagePosition } from '@/components/ImagePositionPicker';
import { smallCircleTier, circleSizeLimits } from '@/lib/circleLabelSizing';
import { CircularLabelPreview } from '@/components/previews/CircularLabelPreview';
import { useSavedDesign } from '@/hooks/useSavedDesign';

const fontColors = [
  { name: 'Maroon', value: '#7f1d1d' },
  { name: 'Brown', value: '#78350f' },
  { name: 'Gold', value: '#a16207' },
  { name: 'Dark Green', value: '#166534' },
  { name: 'Blue', value: '#1d4ed8' },
  { name: 'Navy', value: '#1e3a8a' },
  { name: 'Purple', value: '#5b21b6' },
  { name: 'Burgundy', value: '#701a75' },

  { name: 'Red', value: '#ef4444' },
  { name: 'Peach', value: '#fb923c' },
  { name: 'Yellow', value: '#facc15' },
  { name: 'Light Green', value: '#86efac' },
  { name: 'Light Cyan', value: '#67e8f9' },
  { name: 'Periwinkle', value: '#93c5fd' },
  { name: 'Lavender', value: '#c4b5fd' },
  { name: 'Pink', value: '#f9a8d4' },

  { name: 'Light Pink', value: '#fecaca' },
  { name: 'Sand', value: '#fed7aa' },
  { name: 'Light Yellow', value: '#fef08a' },
  { name: 'Mint', value: '#bbf7d0' },
  { name: 'Pale Cyan', value: '#cffafe' },
  { name: 'Pale Blue', value: '#dbeafe' },
  { name: 'Pale Purple', value: '#e9d5ff' },
  { name: 'Pale Pink', value: '#fce7f3' },

  { name: 'Bright Red', value: '#dc2626' },
  { name: 'Bright Orange', value: '#f97316' },
  { name: 'Bright Yellow', value: '#fde047' },
  { name: 'Lime', value: '#84cc16' },
  { name: 'Aqua', value: '#22d3ee' },
  { name: 'Bright Blue', value: '#2563eb' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Magenta', value: '#d946ef' },

  { name: 'Black', value: '#000000' },
  { name: 'Dark Gray', value: '#374151' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'Light Gray', value: '#d1d5db' },
  { name: 'White', value: '#ffffff' },
  { name: 'None', value: 'transparent' },
];

const backgrounds = [
  { name: 'Maroon', value: '#7f1d1d', bg: '' },
  { name: 'Brown', value: '#78350f', bg: '' },
  { name: 'Gold', value: '#a16207', bg: '' },
  { name: 'Dark Green', value: '#166534', bg: '' },
  { name: 'Blue', value: '#1d4ed8', bg: '' },
  { name: 'Navy', value: '#1e3a8a', bg: '' },
  { name: 'Purple', value: '#5b21b6', bg: '' },
  { name: 'Burgundy', value: '#701a75', bg: '' },

  { name: 'Red', value: '#ef4444', bg: '' },
  { name: 'Peach', value: '#fb923c', bg: '' },
  { name: 'Yellow', value: '#facc15', bg: '' },
  { name: 'Light Green', value: '#86efac', bg: '' },
  { name: 'Light Cyan', value: '#67e8f9', bg: '' },
  { name: 'Periwinkle', value: '#93c5fd', bg: '' },
  { name: 'Lavender', value: '#c4b5fd', bg: '' },
  { name: 'Pink', value: '#f9a8d4', bg: '' },

  { name: 'Light Pink', value: '#fecaca', bg: '' },
  { name: 'Sand', value: '#fed7aa', bg: '' },
  { name: 'Light Yellow', value: '#fef08a', bg: '' },
  { name: 'Mint', value: '#bbf7d0', bg: '' },
  { name: 'Pale Cyan', value: '#cffafe', bg: '' },
  { name: 'Pale Blue', value: '#dbeafe', bg: '' },
  { name: 'Pale Purple', value: '#e9d5ff', bg: '' },
  { name: 'Pale Pink', value: '#fce7f3', bg: '' },

  { name: 'Bright Red', value: '#dc2626', bg: '' },
  { name: 'Bright Orange', value: '#f97316', bg: '' },
  { name: 'Bright Yellow', value: '#fde047', bg: '' },
  { name: 'Lime', value: '#84cc16', bg: '' },
  { name: 'Aqua', value: '#22d3ee', bg: '' },
  { name: 'Bright Blue', value: '#2563eb', bg: '' },
  { name: 'Violet', value: '#7c3aed', bg: '' },
  { name: 'Magenta', value: '#d946ef', bg: '' },

  { name: 'Black', value: '#000000', bg: '' },
  { name: 'Dark Gray', value: '#374151', bg: '' },
  { name: 'Gray', value: '#6b7280', bg: '' },
  { name: 'Light Gray', value: '#d1d5db', bg: '' },
  { name: 'White', value: '#ffffff', bg: '' },
  { name: 'None', value: 'transparent', bg: '' },
];

const fonts = [
  { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Arial Black', value: 'Arial Black, Arial, sans-serif' },
  { name: 'Calibri', value: 'Calibri, Arial, sans-serif' },
  { name: 'Cambria', value: 'Cambria, Georgia, serif' },
  { name: 'Candara', value: 'Candara, Calibri, Arial, sans-serif' },
  { name: 'Century Gothic', value: '"Century Gothic", "Segoe UI", Arial, sans-serif' },
  { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
  { name: 'Consolas', value: 'Consolas, "Courier New", monospace' },
  { name: 'Courier New', value: '"Courier New", Courier, monospace' },
  { name: 'Franklin Gothic', value: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif' },
  { name: 'Garamond', value: 'Garamond, "Times New Roman", serif' },
  { name: 'Georgia', value: 'Georgia, "Times New Roman", serif' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { name: 'Impact', value: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' },
  { name: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
  { name: 'Lucida Sans', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif' },
  { name: 'Palatino', value: '"Palatino Linotype", Palatino, serif' },
  { name: 'Segoe UI', value: '"Segoe UI", Tahoma, Arial, sans-serif' },
  { name: 'Tahoma', value: 'Tahoma, "Segoe UI", Arial, sans-serif' },
  { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { name: 'Trebuchet MS', value: '"Trebuchet MS", "Segoe UI", Arial, sans-serif' },
  { name: 'Verdana', value: 'Verdana, Geneva, Tahoma, sans-serif' },
  { name: 'Brush Script MT', value: '"Brush Script MT", "Segoe Script", cursive' },
  { name: 'Segoe Script', value: '"Segoe Script", "Brush Script MT", cursive' },
  { name: 'Segoe Print', value: '"Segoe Print", "Comic Sans MS", cursive' },
  { name: 'Bookman', value: '"Bookman Old Style", Bookman, serif' },
  { name: 'Rockwell', value: 'Rockwell, "Courier Bold", serif' },
  { name: 'Copperplate', value: 'Copperplate, "Copperplate Gothic Light", fantasy' },
  { name: 'Inter', value: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", Arial, sans-serif' },
  { name: 'Roboto', value: 'Roboto, "Segoe UI", Arial, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, Arial, sans-serif' },
  { name: 'Lato', value: 'Lato, Arial, sans-serif' },
  { name: 'Poppins', value: 'Poppins, Arial, sans-serif' },
  { name: 'Oswald', value: 'Oswald, Arial, sans-serif' },
  { name: 'Raleway', value: 'Raleway, Arial, sans-serif' },
  { name: 'Merriweather', value: 'Merriweather, Georgia, serif' },
  { name: 'Playfair Display', value: '"Playfair Display", Georgia, serif' },
  { name: 'Roboto Slab', value: '"Roboto Slab", Georgia, serif' },
  { name: 'Fira Sans', value: '"Fira Sans", Arial, sans-serif' },
  { name: 'Source Sans 3', value: '"Source Sans 3", Arial, sans-serif' },
  { name: 'PT Sans', value: '"PT Sans", Arial, sans-serif' },
  { name: 'PT Serif', value: '"PT Serif", Georgia, serif' },
  { name: 'Ubuntu', value: 'Ubuntu, Arial, sans-serif' },
  { name: 'Cabin', value: 'Cabin, Arial, sans-serif' },
  { name: 'Quicksand', value: 'Quicksand, Arial, sans-serif' },
  { name: 'Comfortaa', value: 'Comfortaa, Arial, sans-serif' },
  { name: 'Nunito', value: 'Nunito, Arial, sans-serif' },
  { name: 'Kalam', value: 'Kalam, cursive' },
  { name: 'Courgette', value: 'Courgette, cursive' },
  { name: 'Pacifico', value: 'Pacifico, cursive' },
  { name: 'Lobster', value: 'Lobster, cursive' },
  { name: 'Dancing Script', value: '"Dancing Script", cursive' },
  { name: 'Great Vibes', value: '"Great Vibes", cursive' },
  { name: 'Patrick Hand', value: '"Patrick Hand", cursive' },
  { name: 'Passero One', value: '"Passero One", cursive' },
  { name: 'Permanent Marker', value: '"Permanent Marker", cursive' },
  { name: 'System UI', value: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
];

export default function LabelDesigner() {
  const [labelData, setLabelData] = useState({
    firstName: '',
    lastName: '',
    imageUrl: '',
    imageSize: 32,
    imagePosition: defaultImagePosition,
    textColor: fontColors[0].value,
    backgroundColor: 'transparent',
    font: fonts[0].value,
    fontSize: 12,
    bold: false,
    italic: false,
    underline: false,
  });

  const [previewFont, setPreviewFont] = useState<string | null>(null);

  const updateLabel = (field: string, value: any) => {
    setLabelData(prev => ({ ...prev, [field]: value }));
  };

  const selectedFontName = fonts.find((f) => f.value === labelData.font)?.name ?? 'Font';

  const resetTextFormatting = () => {
    setLabelData((prev) => ({
      ...prev,
      font: fonts[0].value,
      fontSize: 12,
      bold: false,
      italic: false,
      underline: false,
    }));
  };

  const navigate = useNavigate();
  const { addItem } = useCart();
  const { saving, isEditingOther, save } = useSavedDesign('circular', setLabelData);

  const addToCart = () => {
    addItem({
      productType: 'circular',
      title: 'Circular Labels',
      unitPriceUGX: 20000,
      quantity: 1,
      design: {
        ...labelData,
      },
    });
    navigate('/cart');
  };

  const smallCircleLimits = circleSizeLimits(smallCircleTier);

  return (
    <Layout>
      <DesignerWorkspace
        onBack={() => (window.history.length > 1 ? navigate(-1) : navigate('/products'))}
        sidebar={
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-lg font-semibold flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                First Name
              </Label>
              <Input
                id="firstName"
                value={labelData.firstName}
                onChange={(e) => updateLabel('firstName', e.target.value)}
                className="text-lg"
                placeholder="Enter first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-lg font-semibold flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Last Name
              </Label>
              <Input
                id="lastName"
                value={labelData.lastName}
                onChange={(e) => updateLabel('lastName', e.target.value)}
                className="text-lg"
                placeholder="Enter last name"
              />
            </div>

            <ImagePicker
              selectedImageUrl={labelData.imageUrl}
              onSelect={(url) => updateLabel('imageUrl', url)}
            />

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-primary rotate-180" />
                Image Size
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={8}
                  max={96}
                  value={labelData.imageSize}
                  onChange={(e) => updateLabel('imageSize', Number(e.target.value) || 32)}
                />
                <span className="text-sm text-muted-foreground w-10 text-right">px</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Scales down automatically on smaller circles · capped at {smallCircleLimits.maxImageSize}px on the smallest labels so it never overflows.
              </p>
            </div>

            <ImagePositionPicker
              value={labelData.imagePosition}
              onChange={(v) => updateLabel('imagePosition', v)}
            />

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Font Color
              </Label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {fontColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => updateLabel('textColor', color.value)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                      labelData.textColor === color.value
                        ? 'border-primary scale-110 ring-2 ring-primary ring-offset-2'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{
                      background:
                        color.value === 'transparent'
                          ? 'linear-gradient(135deg, transparent 44%, #ef4444 44%, #ef4444 56%, transparent 56%), #ffffff'
                          : color.value,
                    }}
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
              <Select value={labelData.font} onValueChange={(v) => updateLabel('font', v)}>
                <SelectTrigger>
                  <SelectValue placeholder={selectedFontName} />
                </SelectTrigger>
                <SelectContent onMouseLeave={() => setPreviewFont(null)}>
                  {fonts.map((font) => (
                    <SelectItem
                      key={font.name}
                      value={font.value}
                      onMouseEnter={() => setPreviewFont(font.value)}
                    >
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Font Size
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={6}
                  max={72}
                  value={labelData.fontSize}
                  onChange={(e) => updateLabel('fontSize', Number(e.target.value) || 12)}
                />
                <span className="text-sm text-muted-foreground w-10 text-right">px</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Scales down automatically on smaller circles · capped at {smallCircleLimits.maxFontSize}px on the smallest labels so text never overflows.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Text Style
              </Label>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  type="button"
                  variant={labelData.bold ? 'secondary' : 'outline'}
                  onClick={() => updateLabel('bold', !labelData.bold)}
                >
                  B
                </Button>
                <Button
                  type="button"
                  variant={labelData.italic ? 'secondary' : 'outline'}
                  onClick={() => updateLabel('italic', !labelData.italic)}
                  className="italic"
                >
                  I
                </Button>
                <Button
                  type="button"
                  variant={labelData.underline ? 'secondary' : 'outline'}
                  onClick={() => updateLabel('underline', !labelData.underline)}
                  className="underline"
                >
                  U
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetTextFormatting}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        }
        canvas={
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <CircularLabelPreview labelData={labelData} fontOverride={previewFont ?? undefined} />

              {isEditingOther && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  You're editing a customer's saved design.
                </p>
              )}

              <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => save(labelData)}
                  disabled={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving…' : isEditingOther ? 'Save Changes' : 'Save Design'}
                </Button>
                {!isEditingOther && (
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={addToCart}
                    disabled={!labelData.firstName && !labelData.lastName}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        }
      />
    </Layout>
  );
}
