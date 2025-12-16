import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

// Comprehensive clipart library organized by categories
const clipartLibrary = {
  animals: [
    { id: 'cat', emoji: '🐱', name: 'Cat' },
    { id: 'dog', emoji: '🐶', name: 'Dog' },
    { id: 'rabbit', emoji: '🐰', name: 'Rabbit' },
    { id: 'bear', emoji: '🐻', name: 'Bear' },
    { id: 'panda', emoji: '🐼', name: 'Panda' },
    { id: 'koala', emoji: '🐨', name: 'Koala' },
    { id: 'tiger', emoji: '🐯', name: 'Tiger' },
    { id: 'lion', emoji: '🦁', name: 'Lion' },
    { id: 'cow', emoji: '🐮', name: 'Cow' },
    { id: 'pig', emoji: '🐷', name: 'Pig' },
    { id: 'frog', emoji: '🐸', name: 'Frog' },
    { id: 'monkey', emoji: '🐵', name: 'Monkey' },
    { id: 'chicken', emoji: '🐔', name: 'Chicken' },
    { id: 'penguin', emoji: '🐧', name: 'Penguin' },
    { id: 'bird', emoji: '🐦', name: 'Bird' },
    { id: 'duck', emoji: '🦆', name: 'Duck' },
    { id: 'owl', emoji: '🦉', name: 'Owl' },
    { id: 'butterfly', emoji: '🦋', name: 'Butterfly' },
    { id: 'bee', emoji: '🐝', name: 'Bee' },
    { id: 'ladybug', emoji: '🐞', name: 'Ladybug' },
    { id: 'turtle', emoji: '🐢', name: 'Turtle' },
    { id: 'snake', emoji: '🐍', name: 'Snake' },
    { id: 'dolphin', emoji: '🐬', name: 'Dolphin' },
    { id: 'whale', emoji: '🐳', name: 'Whale' },
    { id: 'fish', emoji: '🐟', name: 'Fish' },
    { id: 'octopus', emoji: '🐙', name: 'Octopus' },
    { id: 'crab', emoji: '🦀', name: 'Crab' },
    { id: 'unicorn', emoji: '🦄', name: 'Unicorn' },
    { id: 'horse', emoji: '🐴', name: 'Horse' },
    { id: 'deer', emoji: '🦌', name: 'Deer' },
    { id: 'elephant', emoji: '🐘', name: 'Elephant' },
    { id: 'giraffe', emoji: '🦒', name: 'Giraffe' },
    { id: 'zebra', emoji: '🦓', name: 'Zebra' },
    { id: 'gorilla', emoji: '🦍', name: 'Gorilla' },
    { id: 'fox', emoji: '🦊', name: 'Fox' },
    { id: 'wolf', emoji: '🐺', name: 'Wolf' },
    { id: 'hamster', emoji: '🐹', name: 'Hamster' },
    { id: 'mouse', emoji: '🐭', name: 'Mouse' },
    { id: 'hedgehog', emoji: '🦔', name: 'Hedgehog' },
    { id: 'bat', emoji: '🦇', name: 'Bat' },
  ],
  food: [
    { id: 'apple', emoji: '🍎', name: 'Apple' },
    { id: 'green_apple', emoji: '🍏', name: 'Green Apple' },
    { id: 'banana', emoji: '🍌', name: 'Banana' },
    { id: 'orange', emoji: '🍊', name: 'Orange' },
    { id: 'lemon', emoji: '🍋', name: 'Lemon' },
    { id: 'grape', emoji: '🍇', name: 'Grapes' },
    { id: 'watermelon', emoji: '🍉', name: 'Watermelon' },
    { id: 'strawberry', emoji: '🍓', name: 'Strawberry' },
    { id: 'cherry', emoji: '🍒', name: 'Cherry' },
    { id: 'peach', emoji: '🍑', name: 'Peach' },
    { id: 'pineapple', emoji: '🍍', name: 'Pineapple' },
    { id: 'mango', emoji: '🥭', name: 'Mango' },
    { id: 'coconut', emoji: '🥥', name: 'Coconut' },
    { id: 'avocado', emoji: '🥑', name: 'Avocado' },
    { id: 'carrot', emoji: '🥕', name: 'Carrot' },
    { id: 'corn', emoji: '🌽', name: 'Corn' },
    { id: 'broccoli', emoji: '🥦', name: 'Broccoli' },
    { id: 'tomato', emoji: '🍅', name: 'Tomato' },
    { id: 'pizza', emoji: '🍕', name: 'Pizza' },
    { id: 'burger', emoji: '🍔', name: 'Burger' },
    { id: 'fries', emoji: '🍟', name: 'Fries' },
    { id: 'hotdog', emoji: '🌭', name: 'Hot Dog' },
    { id: 'taco', emoji: '🌮', name: 'Taco' },
    { id: 'burrito', emoji: '🌯', name: 'Burrito' },
    { id: 'sandwich', emoji: '🥪', name: 'Sandwich' },
    { id: 'donut', emoji: '🍩', name: 'Donut' },
    { id: 'cookie', emoji: '🍪', name: 'Cookie' },
    { id: 'cake', emoji: '🎂', name: 'Birthday Cake' },
    { id: 'cupcake', emoji: '🧁', name: 'Cupcake' },
    { id: 'ice_cream', emoji: '🍦', name: 'Ice Cream' },
    { id: 'candy', emoji: '🍬', name: 'Candy' },
    { id: 'lollipop', emoji: '🍭', name: 'Lollipop' },
    { id: 'chocolate', emoji: '🍫', name: 'Chocolate' },
    { id: 'popcorn', emoji: '🍿', name: 'Popcorn' },
    { id: 'coffee', emoji: '☕', name: 'Coffee' },
    { id: 'tea', emoji: '🍵', name: 'Tea' },
    { id: 'juice', emoji: '🧃', name: 'Juice Box' },
    { id: 'milk', emoji: '🥛', name: 'Milk' },
    { id: 'egg', emoji: '🥚', name: 'Egg' },
    { id: 'bread', emoji: '🍞', name: 'Bread' },
  ],
  nature: [
    { id: 'sun', emoji: '☀️', name: 'Sun' },
    { id: 'moon', emoji: '🌙', name: 'Moon' },
    { id: 'star', emoji: '⭐', name: 'Star' },
    { id: 'sparkles', emoji: '✨', name: 'Sparkles' },
    { id: 'rainbow', emoji: '🌈', name: 'Rainbow' },
    { id: 'cloud', emoji: '☁️', name: 'Cloud' },
    { id: 'rain', emoji: '🌧️', name: 'Rain' },
    { id: 'snow', emoji: '❄️', name: 'Snowflake' },
    { id: 'lightning', emoji: '⚡', name: 'Lightning' },
    { id: 'fire', emoji: '🔥', name: 'Fire' },
    { id: 'droplet', emoji: '💧', name: 'Water Drop' },
    { id: 'wave', emoji: '🌊', name: 'Wave' },
    { id: 'flower', emoji: '🌸', name: 'Cherry Blossom' },
    { id: 'rose', emoji: '🌹', name: 'Rose' },
    { id: 'tulip', emoji: '🌷', name: 'Tulip' },
    { id: 'sunflower', emoji: '🌻', name: 'Sunflower' },
    { id: 'hibiscus', emoji: '🌺', name: 'Hibiscus' },
    { id: 'bouquet', emoji: '💐', name: 'Bouquet' },
    { id: 'tree', emoji: '🌳', name: 'Tree' },
    { id: 'palm', emoji: '🌴', name: 'Palm Tree' },
    { id: 'cactus', emoji: '🌵', name: 'Cactus' },
    { id: 'clover', emoji: '🍀', name: 'Four Leaf Clover' },
    { id: 'leaf', emoji: '🍃', name: 'Leaf' },
    { id: 'maple', emoji: '🍁', name: 'Maple Leaf' },
    { id: 'mushroom', emoji: '🍄', name: 'Mushroom' },
    { id: 'seedling', emoji: '🌱', name: 'Seedling' },
    { id: 'earth', emoji: '🌍', name: 'Earth' },
    { id: 'mountain', emoji: '🏔️', name: 'Mountain' },
    { id: 'volcano', emoji: '🌋', name: 'Volcano' },
    { id: 'desert', emoji: '🏜️', name: 'Desert' },
  ],
  sports: [
    { id: 'soccer', emoji: '⚽', name: 'Soccer' },
    { id: 'basketball', emoji: '🏀', name: 'Basketball' },
    { id: 'football', emoji: '🏈', name: 'Football' },
    { id: 'baseball', emoji: '⚾', name: 'Baseball' },
    { id: 'tennis', emoji: '🎾', name: 'Tennis' },
    { id: 'volleyball', emoji: '🏐', name: 'Volleyball' },
    { id: 'rugby', emoji: '🏉', name: 'Rugby' },
    { id: 'golf', emoji: '⛳', name: 'Golf' },
    { id: 'hockey', emoji: '🏒', name: 'Ice Hockey' },
    { id: 'cricket', emoji: '🏏', name: 'Cricket' },
    { id: 'badminton', emoji: '🏸', name: 'Badminton' },
    { id: 'ping_pong', emoji: '🏓', name: 'Ping Pong' },
    { id: 'boxing', emoji: '🥊', name: 'Boxing' },
    { id: 'martial_arts', emoji: '🥋', name: 'Martial Arts' },
    { id: 'swimming', emoji: '🏊', name: 'Swimming' },
    { id: 'surfing', emoji: '🏄', name: 'Surfing' },
    { id: 'skiing', emoji: '⛷️', name: 'Skiing' },
    { id: 'snowboard', emoji: '🏂', name: 'Snowboarding' },
    { id: 'skating', emoji: '⛸️', name: 'Ice Skating' },
    { id: 'cycling', emoji: '🚴', name: 'Cycling' },
    { id: 'running', emoji: '🏃', name: 'Running' },
    { id: 'gymnastics', emoji: '🤸', name: 'Gymnastics' },
    { id: 'weightlifting', emoji: '🏋️', name: 'Weightlifting' },
    { id: 'trophy', emoji: '🏆', name: 'Trophy' },
    { id: 'medal', emoji: '🥇', name: 'Gold Medal' },
    { id: 'silver_medal', emoji: '🥈', name: 'Silver Medal' },
    { id: 'bronze_medal', emoji: '🥉', name: 'Bronze Medal' },
    { id: 'dart', emoji: '🎯', name: 'Dart' },
    { id: 'bowling', emoji: '🎳', name: 'Bowling' },
    { id: 'fishing', emoji: '🎣', name: 'Fishing' },
  ],
  symbols: [
    { id: 'heart', emoji: '❤️', name: 'Red Heart' },
    { id: 'orange_heart', emoji: '🧡', name: 'Orange Heart' },
    { id: 'yellow_heart', emoji: '💛', name: 'Yellow Heart' },
    { id: 'green_heart', emoji: '💚', name: 'Green Heart' },
    { id: 'blue_heart', emoji: '💙', name: 'Blue Heart' },
    { id: 'purple_heart', emoji: '💜', name: 'Purple Heart' },
    { id: 'pink_heart', emoji: '💗', name: 'Pink Heart' },
    { id: 'sparkling_heart', emoji: '💖', name: 'Sparkling Heart' },
    { id: 'two_hearts', emoji: '💕', name: 'Two Hearts' },
    { id: 'peace', emoji: '☮️', name: 'Peace' },
    { id: 'check', emoji: '✅', name: 'Check Mark' },
    { id: 'cross', emoji: '❌', name: 'Cross Mark' },
    { id: 'warning', emoji: '⚠️', name: 'Warning' },
    { id: 'question', emoji: '❓', name: 'Question' },
    { id: 'exclamation', emoji: '❗', name: 'Exclamation' },
    { id: 'infinity', emoji: '♾️', name: 'Infinity' },
    { id: 'music', emoji: '🎵', name: 'Music Note' },
    { id: 'notes', emoji: '🎶', name: 'Music Notes' },
    { id: 'crown', emoji: '👑', name: 'Crown' },
    { id: 'diamond', emoji: '💎', name: 'Diamond' },
    { id: 'ring', emoji: '💍', name: 'Ring' },
    { id: 'gift', emoji: '🎁', name: 'Gift' },
    { id: 'balloon', emoji: '🎈', name: 'Balloon' },
    { id: 'party', emoji: '🎉', name: 'Party' },
    { id: 'confetti', emoji: '🎊', name: 'Confetti' },
    { id: 'ribbon', emoji: '🎀', name: 'Ribbon' },
    { id: 'bow', emoji: '🏹', name: 'Bow' },
    { id: 'bell', emoji: '🔔', name: 'Bell' },
    { id: 'key', emoji: '🔑', name: 'Key' },
    { id: 'lock', emoji: '🔒', name: 'Lock' },
  ],
  transport: [
    { id: 'car', emoji: '🚗', name: 'Car' },
    { id: 'taxi', emoji: '🚕', name: 'Taxi' },
    { id: 'bus', emoji: '🚌', name: 'Bus' },
    { id: 'truck', emoji: '🚚', name: 'Truck' },
    { id: 'ambulance', emoji: '🚑', name: 'Ambulance' },
    { id: 'fire_truck', emoji: '🚒', name: 'Fire Truck' },
    { id: 'police', emoji: '🚔', name: 'Police Car' },
    { id: 'motorcycle', emoji: '🏍️', name: 'Motorcycle' },
    { id: 'bicycle', emoji: '🚲', name: 'Bicycle' },
    { id: 'scooter', emoji: '🛴', name: 'Scooter' },
    { id: 'train', emoji: '🚂', name: 'Train' },
    { id: 'metro', emoji: '🚇', name: 'Metro' },
    { id: 'tram', emoji: '🚊', name: 'Tram' },
    { id: 'airplane', emoji: '✈️', name: 'Airplane' },
    { id: 'helicopter', emoji: '🚁', name: 'Helicopter' },
    { id: 'rocket', emoji: '🚀', name: 'Rocket' },
    { id: 'ufo', emoji: '🛸', name: 'UFO' },
    { id: 'ship', emoji: '🚢', name: 'Ship' },
    { id: 'boat', emoji: '⛵', name: 'Sailboat' },
    { id: 'speedboat', emoji: '🚤', name: 'Speedboat' },
    { id: 'anchor', emoji: '⚓', name: 'Anchor' },
    { id: 'fuel', emoji: '⛽', name: 'Fuel Pump' },
    { id: 'traffic_light', emoji: '🚦', name: 'Traffic Light' },
    { id: 'construction', emoji: '🚧', name: 'Construction' },
    { id: 'wheel', emoji: '🛞', name: 'Wheel' },
    { id: 'tractor', emoji: '🚜', name: 'Tractor' },
    { id: 'skateboard', emoji: '🛹', name: 'Skateboard' },
    { id: 'roller_skate', emoji: '🛼', name: 'Roller Skate' },
    { id: 'canoe', emoji: '🛶', name: 'Canoe' },
    { id: 'parachute', emoji: '🪂', name: 'Parachute' },
  ],
  school: [
    { id: 'book', emoji: '📚', name: 'Books' },
    { id: 'notebook', emoji: '📓', name: 'Notebook' },
    { id: 'pencil', emoji: '✏️', name: 'Pencil' },
    { id: 'pen', emoji: '🖊️', name: 'Pen' },
    { id: 'crayon', emoji: '🖍️', name: 'Crayon' },
    { id: 'ruler', emoji: '📏', name: 'Ruler' },
    { id: 'scissors', emoji: '✂️', name: 'Scissors' },
    { id: 'backpack', emoji: '🎒', name: 'Backpack' },
    { id: 'graduation', emoji: '🎓', name: 'Graduation Cap' },
    { id: 'microscope', emoji: '🔬', name: 'Microscope' },
    { id: 'telescope', emoji: '🔭', name: 'Telescope' },
    { id: 'calculator', emoji: '🧮', name: 'Abacus' },
    { id: 'computer', emoji: '💻', name: 'Laptop' },
    { id: 'globe', emoji: '🌐', name: 'Globe' },
    { id: 'palette', emoji: '🎨', name: 'Art Palette' },
    { id: 'abc', emoji: '🔤', name: 'ABC' },
    { id: '123', emoji: '🔢', name: '123' },
    { id: 'magnifier', emoji: '🔍', name: 'Magnifier' },
    { id: 'lightbulb', emoji: '💡', name: 'Light Bulb' },
    { id: 'brain', emoji: '🧠', name: 'Brain' },
    { id: 'memo', emoji: '📝', name: 'Memo' },
    { id: 'clipboard', emoji: '📋', name: 'Clipboard' },
    { id: 'calendar', emoji: '📅', name: 'Calendar' },
    { id: 'clock', emoji: '⏰', name: 'Alarm Clock' },
    { id: 'trophy_school', emoji: '🏅', name: 'Medal' },
    { id: 'folder', emoji: '📁', name: 'Folder' },
    { id: 'paperclip', emoji: '📎', name: 'Paperclip' },
    { id: 'pushpin', emoji: '📌', name: 'Pushpin' },
    { id: 'triangular_ruler', emoji: '📐', name: 'Triangular Ruler' },
    { id: 'school', emoji: '🏫', name: 'School' },
  ],
  faces: [
    { id: 'smile', emoji: '😊', name: 'Smiling Face' },
    { id: 'laugh', emoji: '😂', name: 'Laughing' },
    { id: 'joy', emoji: '🤣', name: 'Joy' },
    { id: 'wink', emoji: '😉', name: 'Winking' },
    { id: 'love_eyes', emoji: '😍', name: 'Heart Eyes' },
    { id: 'star_eyes', emoji: '🤩', name: 'Star Eyes' },
    { id: 'kiss', emoji: '😘', name: 'Kissing' },
    { id: 'tongue', emoji: '😋', name: 'Yummy' },
    { id: 'cool', emoji: '😎', name: 'Cool' },
    { id: 'nerd', emoji: '🤓', name: 'Nerd' },
    { id: 'thinking', emoji: '🤔', name: 'Thinking' },
    { id: 'shush', emoji: '🤫', name: 'Shushing' },
    { id: 'zany', emoji: '🤪', name: 'Zany' },
    { id: 'money', emoji: '🤑', name: 'Money Face' },
    { id: 'hug', emoji: '🤗', name: 'Hugging' },
    { id: 'party_face', emoji: '🥳', name: 'Party Face' },
    { id: 'sleepy', emoji: '😴', name: 'Sleepy' },
    { id: 'angel', emoji: '😇', name: 'Angel' },
    { id: 'cowboy', emoji: '🤠', name: 'Cowboy' },
    { id: 'clown', emoji: '🤡', name: 'Clown' },
    { id: 'ghost', emoji: '👻', name: 'Ghost' },
    { id: 'alien', emoji: '👽', name: 'Alien' },
    { id: 'robot', emoji: '🤖', name: 'Robot' },
    { id: 'skull', emoji: '💀', name: 'Skull' },
    { id: 'poop', emoji: '💩', name: 'Poop' },
    { id: 'cat_face', emoji: '😺', name: 'Cat Face' },
    { id: 'monkey_face', emoji: '🙈', name: 'See No Evil' },
    { id: 'baby', emoji: '👶', name: 'Baby' },
    { id: 'boy', emoji: '👦', name: 'Boy' },
    { id: 'girl', emoji: '👧', name: 'Girl' },
  ],
  hands: [
    { id: 'thumbs_up', emoji: '👍', name: 'Thumbs Up' },
    { id: 'thumbs_down', emoji: '👎', name: 'Thumbs Down' },
    { id: 'clap', emoji: '👏', name: 'Clapping' },
    { id: 'wave', emoji: '👋', name: 'Waving' },
    { id: 'ok', emoji: '👌', name: 'OK Hand' },
    { id: 'peace_hand', emoji: '✌️', name: 'Peace Hand' },
    { id: 'love_hand', emoji: '🤟', name: 'Love You' },
    { id: 'rock', emoji: '🤘', name: 'Rock On' },
    { id: 'pinch', emoji: '🤏', name: 'Pinching' },
    { id: 'fist', emoji: '✊', name: 'Raised Fist' },
    { id: 'punch', emoji: '👊', name: 'Fist Bump' },
    { id: 'high_five', emoji: '🙌', name: 'High Five' },
    { id: 'pray', emoji: '🙏', name: 'Praying' },
    { id: 'handshake', emoji: '🤝', name: 'Handshake' },
    { id: 'writing', emoji: '✍️', name: 'Writing' },
    { id: 'nail_polish', emoji: '💅', name: 'Nail Polish' },
    { id: 'selfie', emoji: '🤳', name: 'Selfie' },
    { id: 'muscle', emoji: '💪', name: 'Muscle' },
    { id: 'point_up', emoji: '☝️', name: 'Point Up' },
    { id: 'point_down', emoji: '👇', name: 'Point Down' },
    { id: 'point_left', emoji: '👈', name: 'Point Left' },
    { id: 'point_right', emoji: '👉', name: 'Point Right' },
    { id: 'crossed_fingers', emoji: '🤞', name: 'Crossed Fingers' },
    { id: 'call_me', emoji: '🤙', name: 'Call Me' },
    { id: 'raised_hand', emoji: '✋', name: 'Raised Hand' },
    { id: 'vulcan', emoji: '🖖', name: 'Vulcan' },
    { id: 'open_hands', emoji: '👐', name: 'Open Hands' },
    { id: 'palms_up', emoji: '🤲', name: 'Palms Up' },
    { id: 'heart_hands', emoji: '🫶', name: 'Heart Hands' },
    { id: 'salute', emoji: '🫡', name: 'Salute' },
  ],
  holidays: [
    { id: 'christmas_tree', emoji: '🎄', name: 'Christmas Tree' },
    { id: 'santa', emoji: '🎅', name: 'Santa' },
    { id: 'snowman', emoji: '⛄', name: 'Snowman' },
    { id: 'present', emoji: '🎁', name: 'Present' },
    { id: 'pumpkin', emoji: '🎃', name: 'Pumpkin' },
    { id: 'easter_egg', emoji: '🥚', name: 'Easter Egg' },
    { id: 'bunny', emoji: '🐰', name: 'Easter Bunny' },
    { id: 'fireworks', emoji: '🎆', name: 'Fireworks' },
    { id: 'sparkler', emoji: '🎇', name: 'Sparkler' },
    { id: 'firecracker', emoji: '🧨', name: 'Firecracker' },
    { id: 'red_envelope', emoji: '🧧', name: 'Red Envelope' },
    { id: 'tanabata', emoji: '🎋', name: 'Tanabata Tree' },
    { id: 'pine', emoji: '🎍', name: 'Pine Decoration' },
    { id: 'doll', emoji: '🎎', name: 'Japanese Dolls' },
    { id: 'carp', emoji: '🎏', name: 'Carp Streamer' },
    { id: 'wind_chime', emoji: '🎐', name: 'Wind Chime' },
    { id: 'moon_ceremony', emoji: '🎑', name: 'Moon Ceremony' },
    { id: 'jack_o_lantern', emoji: '🎃', name: 'Jack-o-Lantern' },
    { id: 'menorah', emoji: '🕎', name: 'Menorah' },
    { id: 'diya', emoji: '🪔', name: 'Diya Lamp' },
    { id: 'candle', emoji: '🕯️', name: 'Candle' },
    { id: 'turkey', emoji: '🦃', name: 'Turkey' },
    { id: 'horn', emoji: '📯', name: 'Horn' },
    { id: 'magic_wand', emoji: '🪄', name: 'Magic Wand' },
    { id: 'pinata', emoji: '🪅', name: 'Piñata' },
    { id: 'mirror_ball', emoji: '🪩', name: 'Mirror Ball' },
    { id: 'nesting_dolls', emoji: '🪆', name: 'Nesting Dolls' },
    { id: 'sled', emoji: '🛷', name: 'Sled' },
    { id: 'mittens', emoji: '🧤', name: 'Mittens' },
    { id: 'scarf', emoji: '🧣', name: 'Scarf' },
  ],
  objects: [
    { id: 'camera', emoji: '📷', name: 'Camera' },
    { id: 'phone', emoji: '📱', name: 'Phone' },
    { id: 'tv', emoji: '📺', name: 'TV' },
    { id: 'radio', emoji: '📻', name: 'Radio' },
    { id: 'flashlight', emoji: '🔦', name: 'Flashlight' },
    { id: 'battery', emoji: '🔋', name: 'Battery' },
    { id: 'plug', emoji: '🔌', name: 'Plug' },
    { id: 'umbrella', emoji: '☂️', name: 'Umbrella' },
    { id: 'glasses', emoji: '👓', name: 'Glasses' },
    { id: 'sunglasses', emoji: '🕶️', name: 'Sunglasses' },
    { id: 'watch', emoji: '⌚', name: 'Watch' },
    { id: 'gem', emoji: '💎', name: 'Gem' },
    { id: 'lipstick', emoji: '💄', name: 'Lipstick' },
    { id: 'shirt', emoji: '👕', name: 'T-Shirt' },
    { id: 'dress', emoji: '👗', name: 'Dress' },
    { id: 'jeans', emoji: '👖', name: 'Jeans' },
    { id: 'shoe', emoji: '👟', name: 'Sneaker' },
    { id: 'boot', emoji: '👢', name: 'Boot' },
    { id: 'hat', emoji: '🎩', name: 'Top Hat' },
    { id: 'cap', emoji: '🧢', name: 'Cap' },
    { id: 'handbag', emoji: '👜', name: 'Handbag' },
    { id: 'suitcase', emoji: '🧳', name: 'Suitcase' },
    { id: 'teddy', emoji: '🧸', name: 'Teddy Bear' },
    { id: 'yarn', emoji: '🧶', name: 'Yarn' },
    { id: 'thread', emoji: '🧵', name: 'Thread' },
    { id: 'safety_pin', emoji: '🧷', name: 'Safety Pin' },
    { id: 'broom', emoji: '🧹', name: 'Broom' },
    { id: 'soap', emoji: '🧼', name: 'Soap' },
    { id: 'toothbrush', emoji: '🪥', name: 'Toothbrush' },
    { id: 'mirror', emoji: '🪞', name: 'Mirror' },
  ],
};

const categories = [
  { id: 'all', name: 'All' },
  { id: 'animals', name: 'Animals' },
  { id: 'food', name: 'Food' },
  { id: 'nature', name: 'Nature' },
  { id: 'sports', name: 'Sports' },
  { id: 'symbols', name: 'Symbols' },
  { id: 'transport', name: 'Transport' },
  { id: 'school', name: 'School' },
  { id: 'faces', name: 'Faces' },
  { id: 'hands', name: 'Hands' },
  { id: 'holidays', name: 'Holidays' },
  { id: 'objects', name: 'Objects' },
];

interface ClipartPickerProps {
  selectedClipart: string;
  onSelect: (emoji: string) => void;
  showClipart: boolean;
  onToggleShow: (show: boolean) => void;
}

export function ClipartPicker({ selectedClipart, onSelect, showClipart, onToggleShow }: ClipartPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allClipart = useMemo(() => {
    return Object.values(clipartLibrary).flat();
  }, []);

  const filteredClipart = useMemo(() => {
    let items = selectedCategory === 'all' 
      ? allClipart 
      : clipartLibrary[selectedCategory as keyof typeof clipartLibrary] || [];
    
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return items;
  }, [selectedCategory, searchTerm, allClipart]);

  const totalCount = allClipart.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Choose Clipart</h3>
        <label className="flex items-center gap-2 text-sm">
          <input 
            type="checkbox"
            checked={showClipart}
            onChange={(e) => onToggleShow(e.target.checked)}
            className="rounded border-border"
          />
          Show on label
        </label>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search clipart..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {filteredClipart.length} of {totalCount} images
      </p>

      {/* Clipart Grid */}
      <ScrollArea className="h-48 rounded-md border border-border">
        <div className="grid grid-cols-6 gap-1 p-2">
          {filteredClipart.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.emoji)}
              className={`p-2 text-2xl rounded-md transition-all hover:bg-muted ${
                selectedClipart === item.emoji 
                  ? 'bg-primary/20 ring-2 ring-primary' 
                  : ''
              }`}
              title={item.name}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Selected Preview */}
      {selectedClipart && showClipart && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <span className="text-sm text-muted-foreground">Selected:</span>
          <span className="text-3xl">{selectedClipart}</span>
        </div>
      )}
    </div>
  );
}
