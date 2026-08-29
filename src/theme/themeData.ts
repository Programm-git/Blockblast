import type { CompactTheme } from './themeBuilder';

const WHEEL = { type: 'wheel' as const };
const START = { type: 'start' as const };
const SECRET = { type: 'secret' as const };

/**
 * Compact source data for all 51 themes. themeBuilder.buildTheme() expands
 * each entry into a full GameTheme (board/ui colors derived, glow/highlight
 * scaled by rarity) — this file only carries the creative identity of each
 * world: its gradient, palette, decor motif, material and particle type.
 */
export const THEME_DATA: CompactTheme[] = [
  // ---------- COMMON ----------
  {
    id: 'classic', name: 'Classic', rarity: 'common', unlock: START,
    bg: ['#f3efe7', '#e7e0d2'], surface: '#ffffff', accent: '#4f8ef7',
    blocks: ['#4f8ef7', '#f7a23d', '#4fc373', '#f4d13d', '#a768e0', '#f0564f'],
    decor: 'none', material: 'matte', particle: 'square', dark: false,
  },
  {
    id: 'sky', name: 'Sky', rarity: 'common', unlock: WHEEL,
    bg: ['#eaf5ff', '#ffffff'], surface: '#f2f8ff', accent: '#3d9bf0',
    blocks: ['#5ec4f0', '#3ad0c4', '#eaf2ff', '#ffd35e', '#ff8a78', '#a887e8'],
    decor: 'clouds', material: 'matte', particle: 'glow', dark: false,
  },
  {
    id: 'meadow', name: 'Meadow', rarity: 'common', unlock: WHEEL,
    bg: ['#f2ecd8', '#dff0d0'], surface: '#eef5e2', accent: '#5fae4a',
    blocks: ['#5fae4a', '#e8d34a', '#f2a33e', '#5ea8e0', '#e888c8', '#8ac97a'],
    decor: 'leaves', material: 'matte', particle: 'leaf', dark: false,
  },
  {
    id: 'beach', name: 'Beach', rarity: 'common', unlock: WHEEL,
    bg: ['#e9f7f7', '#f2e3bf'], surface: '#f4ecd2', accent: '#3ec2c9',
    blocks: ['#3ec2c9', '#4f8ef7', '#ff8a68', '#ffd35e', '#ff9c4a', '#e8734f'],
    decor: 'sand', material: 'matte', particle: 'sand', dark: false,
  },
  {
    id: 'lavender', name: 'Lavender', rarity: 'common', unlock: WHEEL,
    bg: ['#f3eefc', '#ece6fb'], surface: '#f3eefc', accent: '#a77ee0',
    blocks: ['#c6a0ec', '#f2a0c9', '#a7d4f0', '#8fe0c4', '#f2d95e', '#c6a0ec'],
    decor: 'none', material: 'matte', particle: 'glow', dark: false,
  },
  {
    id: 'mint', name: 'Mint', rarity: 'common', unlock: WHEEL,
    bg: ['#effaf3', '#f6f1e4'], surface: '#e6f7ec', accent: '#3fbf8f',
    blocks: ['#3fbf8f', '#3ad0c4', '#ff9c4a', '#f4d13d', '#4f8ef7', '#f28ac0'],
    decor: 'none', material: 'glossy', particle: 'bubble', dark: false,
  },
  {
    id: 'peach', name: 'Peach', rarity: 'common', unlock: WHEEL,
    bg: ['#fdece0', '#fbe0e8'], surface: '#fbe9db', accent: '#f28a5c',
    blocks: ['#f6b28a', '#ef5c5c', '#f28ac0', '#f4d13d', '#b98cf0', '#4ecad1'],
    decor: 'none', material: 'glossy', particle: 'spark', dark: false,
  },
  {
    id: 'blueprint', name: 'Blueprint', rarity: 'common', unlock: WHEEL,
    bg: ['#1c3a5e', '#274a70'], surface: '#20416a', accent: '#8fd1ff',
    blocks: ['#dfeeff', '#7fd6ff', '#ff9c4a', '#5fbf6f', '#f4d13d', '#a887e8'],
    decor: 'none', material: 'metal', particle: 'square', dark: true,
  },
  {
    id: 'coffee', name: 'Coffee', rarity: 'common', unlock: WHEEL,
    bg: ['#f2e6d5', '#c8a37c'], surface: '#e6d2b6', accent: '#8a5a3c',
    blocks: ['#c88a52', '#e8d2b0', '#6b3f26', '#e8934a', '#6fa06a', '#5f8fc7'],
    decor: 'none', material: 'wood', particle: 'sand', dark: false,
  },
  {
    id: 'spring', name: 'Spring', rarity: 'common', unlock: WHEEL,
    bg: ['#eafce0', '#e6f4fb'], surface: '#effaf0', accent: '#5fb35a',
    blocks: ['#f28ac0', '#f4d13d', '#8fe0c4', '#5fb35a', '#7fc3f0', '#c6a0ec'],
    decor: 'petals', material: 'matte', particle: 'petal', dark: false,
  },

  // ---------- RARE ----------
  {
    id: 'ocean', name: 'Ocean', rarity: 'rare', unlock: WHEEL,
    bg: ['#062a4a', '#0f8f8a'], surface: '#0c3a5f', accent: '#3ad0e6',
    blocks: ['#3ad0e6', '#1fc6a4', '#3d8bf7', '#ff8a68', '#ffd35e', '#9b6bf2'],
    decor: 'bubbles', material: 'glass', particle: 'bubble', dark: true,
  },
  {
    id: 'sunset', name: 'Sunset', rarity: 'rare', unlock: WHEEL,
    bg: ['#ff8a5c', '#e05c8a', '#5b3b8c'], surface: '#7a3f6e', accent: '#ffcf4a',
    blocks: ['#ff9c4a', '#ffcf4a', '#ff6f9c', '#c76bef', '#ff5c5c', '#4ad6d1'],
    decor: 'none', material: 'glossy', particle: 'spark', dark: true,
  },
  {
    id: 'forest', name: 'Forest', rarity: 'rare', unlock: WHEEL,
    bg: ['#152e1c', '#2c4f2a'], surface: '#203a24', accent: '#7fcf6a',
    blocks: ['#3fae5a', '#a7d94a', '#e8b23e', '#e8834a', '#5f9fe0', '#8a5a3c'],
    decor: 'leaves', material: 'wood', particle: 'leaf', dark: true,
  },
  {
    id: 'candy', name: 'Candy', rarity: 'rare', unlock: WHEEL,
    bg: ['#ffe3f1', '#e3f0ff'], surface: '#fff0f8', accent: '#ff6fa5',
    blocks: ['#ff6fa5', '#5fe0c0', '#b98cf0', '#ffd75e', '#5fc9ea', '#ffab7a'],
    decor: 'sparkle', material: 'glossy', particle: 'star', dark: false,
  },
  {
    id: 'nightcity', name: 'Night City', rarity: 'rare', unlock: WHEEL,
    bg: ['#0d1128', '#1c1f3d'], surface: '#161a34', accent: '#ff4ecb',
    blocks: ['#4ef0ff', '#ff4ecb', '#ff9c4a', '#5fe07a', '#a877ef', '#ffd75e'],
    decor: 'fireflies', material: 'glow', particle: 'spark', dark: true,
  },
  {
    id: 'autumn', name: 'Autumn', rarity: 'rare', unlock: WHEEL,
    bg: ['#3a1a12', '#6e2f1c'], surface: '#4a2417', accent: '#e8a13e',
    blocks: ['#e8a13e', '#c94f2e', '#8a3020', '#a88a2e', '#7a4a26', '#b96a2e'],
    decor: 'leaves', material: 'matte', particle: 'leaf', dark: true,
  },
  {
    id: 'arctic', name: 'Arctic', rarity: 'rare', unlock: WHEEL,
    bg: ['#dff2fb', '#aee0f2'], surface: '#e9f6fc', accent: '#4fc0e0',
    blocks: ['#bfeaf7', '#7fd6ef', '#4fc0e0', '#9db8f2', '#dff2fb', '#5f9ee0'],
    decor: 'snow', material: 'glass', particle: 'crystal', dark: false,
  },
  {
    id: 'desert', name: 'Desert', rarity: 'rare', unlock: WHEEL,
    bg: ['#f2c877', '#e08a4a'], surface: '#e6a860', accent: '#c9622e',
    blocks: ['#e8b25a', '#c9622e', '#f2d98a', '#8a5a3c', '#4fc0c9', '#e8734f'],
    decor: 'sand', material: 'matte', particle: 'sand', dark: false,
  },
  {
    id: 'cherryblossom', name: 'Cherry Blossom', rarity: 'rare', unlock: WHEEL,
    bg: ['#fdeef2', '#fbd9e6'], surface: '#fdeef2', accent: '#f28ac0',
    blocks: ['#f7c6dc', '#ffffff', '#ef6f8f', '#dcc6f7', '#a7e0c9', '#f28ac0'],
    decor: 'petals', material: 'glossy', particle: 'petal', dark: false,
  },
  {
    id: 'rainforest', name: 'Rainforest', rarity: 'rare', unlock: WHEEL,
    bg: ['#0e2b1c', '#194a2e'], surface: '#163a25', accent: '#3fd98a',
    blocks: ['#3fd98a', '#3ad0c4', '#f4d13d', '#ff9c4a', '#ef5cae', '#5f9fe0'],
    decor: 'leaves', material: 'glossy', particle: 'leaf', dark: true,
  },

  // ---------- EPIC ----------
  {
    id: 'space', name: 'Space', rarity: 'epic', unlock: WHEEL,
    bg: ['#05060f', '#141032', '#1c1a44'], surface: '#12102a', accent: '#7fd6ff',
    blocks: ['#4fe0ff', '#7f8cff', '#c67fef', '#ff6fc4', '#ffb25e', '#5fe0a0'],
    decor: 'stars', material: 'glow', particle: 'star', dark: true,
  },
  {
    id: 'volcano', name: 'Volcano', rarity: 'epic', unlock: WHEEL,
    bg: ['#1a0d0a', '#3a140c', '#5c1c0c'], surface: '#2a120c', accent: '#ff7a3d',
    blocks: ['#ff7a3d', '#ffb44a', '#e04a2e', '#8a2e18', '#3a1a12', '#e8e8e8'],
    decor: 'embers', material: 'obsidian', particle: 'ember', dark: true,
  },
  {
    id: 'deepsea', name: 'Deep Sea', rarity: 'epic', unlock: WHEEL,
    bg: ['#020a1a', '#04213a', '#063a52'], surface: '#052a44', accent: '#3fd0e0',
    blocks: ['#3fd0e0', '#4f8ef7', '#7f5cef', '#5fe0c4', '#2fb0d0', '#9b6bf2'],
    decor: 'fireflies', material: 'glow', particle: 'glow', dark: true,
  },
  {
    id: 'cybercity', name: 'Cyber City', rarity: 'epic', unlock: WHEEL,
    bg: ['#050914', '#0e1730', '#141c3a'], surface: '#0e1730', accent: '#00e5ff',
    blocks: ['#00e5ff', '#ff2fd4', '#ffe14a', '#5fff9a', '#7f5cff', '#ff5c5c'],
    decor: 'lightning', material: 'holo', particle: 'pixel', dark: true,
  },
  {
    id: 'crystalcave', name: 'Crystal Cave', rarity: 'epic', unlock: WHEEL,
    bg: ['#0e0a1c', '#241640', '#341c56'], surface: '#1c1236', accent: '#b98cf0',
    blocks: ['#b98cf0', '#7fd6ef', '#f28ac0', '#ffe14a', '#5fe0c4', '#8f7fef'],
    decor: 'sparkle', material: 'crystal', particle: 'crystal', dark: true,
  },
  {
    id: 'storm', name: 'Storm', rarity: 'epic', unlock: WHEEL,
    bg: ['#12141c', '#242a3a', '#343e56'], surface: '#1e2230', accent: '#9fd6ff',
    blocks: ['#9fd6ff', '#c9ccd6', '#7f5cff', '#4fe0ff', '#ffe14a', '#e8ecf4'],
    decor: 'lightning', material: 'metal', particle: 'lightning', dark: true,
  },
  {
    id: 'ancienttemple', name: 'Ancient Temple', rarity: 'epic', unlock: WHEEL,
    bg: ['#241a0c', '#3a2814', '#4a3418'], surface: '#2e2210', accent: '#e8b23e',
    blocks: ['#e8b23e', '#c94f2e', '#3fae5a', '#4f8ef7', '#e8e0c8', '#8a5a3c'],
    decor: 'runes', material: 'marble', particle: 'rune', dark: true,
  },
  {
    id: 'underground', name: 'Underground', rarity: 'epic', unlock: WHEEL,
    bg: ['#0a0e0a', '#1a241a', '#243424'], surface: '#162016', accent: '#5fe07a',
    blocks: ['#5fe07a', '#4fc0e0', '#e8b23e', '#c76bef', '#ff6f6f', '#8fa88f'],
    decor: 'embers', material: 'crystal', particle: 'mineral', dark: true,
  },
  {
    id: 'aurora', name: 'Aurora', rarity: 'epic', unlock: WHEEL,
    bg: ['#050a1c', '#0c1c3a', '#123050'], surface: '#0e1c34', accent: '#5fe0c4',
    blocks: ['#5fe0c4', '#7f9cff', '#c67fef', '#5fe07a', '#ff8fd4', '#7fd6ff'],
    decor: 'aurora', material: 'glow', particle: 'glow', dark: true,
  },
  {
    id: 'retroarcade', name: 'Retro Arcade', rarity: 'epic', unlock: WHEEL,
    bg: ['#120a24', '#2a1244', '#3a1858'], surface: '#1c0e34', accent: '#ff2fd4',
    blocks: ['#ff2fd4', '#00e5ff', '#ffe14a', '#5fff9a', '#ff5c5c', '#7f5cff'],
    decor: 'lightning', material: 'holo', particle: 'pixel', dark: true,
  },

  // ---------- MYTHIC ----------
  {
    id: 'celestial', name: 'Celestial', rarity: 'mythic', unlock: WHEEL,
    bg: ['#fdf6e3', '#f7e6b8', '#eec97a'], surface: '#faf0d2', accent: '#e8b23e',
    blocks: ['#fff6d8', '#e8b23e', '#7fd6ff', '#f2f2f2', '#ffd9a0', '#c9a3ef'],
    decor: 'sparkle', material: 'holo', particle: 'feather', dark: false,
  },
  {
    id: 'dragonfire', name: 'Dragon Fire', rarity: 'mythic', unlock: WHEEL,
    bg: ['#1a0805', '#3a0f08', '#5c1808'], surface: '#2a0e08', accent: '#ff5a1e',
    blocks: ['#ff5a1e', '#ffb23e', '#8a1808', '#e02e0e', '#2a0e08', '#ffe14a'],
    decor: 'embers', material: 'obsidian', particle: 'ember', dark: true,
  },
  {
    id: 'enchantedforest', name: 'Enchanted Forest', rarity: 'mythic', unlock: WHEEL,
    bg: ['#050f0a', '#0c2418', '#123a24'], surface: '#0e2418', accent: '#5fe0a0',
    blocks: ['#5fe0a0', '#b98cf0', '#5fc9ea', '#7fef8f', '#f28ac0', '#e8e14a'],
    decor: 'fireflies', material: 'crystal', particle: 'leaf', dark: true,
  },
  {
    id: 'atlantis', name: 'Atlantis', rarity: 'mythic', unlock: WHEEL,
    bg: ['#02101c', '#053050', '#0a4a70'], surface: '#083a5c', accent: '#4fe0d0',
    blocks: ['#4fe0d0', '#e8b23e', '#5fc9ea', '#7fd6ff', '#f2e0a0', '#3aa8c4'],
    decor: 'bubbles', material: 'crystal', particle: 'bubble', dark: true,
  },
  {
    id: 'phoenix', name: 'Phoenix', rarity: 'mythic', unlock: WHEEL,
    bg: ['#0c0402', '#2a0a04', '#4a1204'], surface: '#1e0803', accent: '#ff8a1e',
    blocks: ['#ff8a1e', '#ffcf4a', '#e02e0e', '#8a1a04', '#ffe8b0', '#ff5a1e'],
    decor: 'embers', material: 'glow', particle: 'feather', dark: true,
  },
  {
    id: 'moonpalace', name: 'Moon Palace', rarity: 'mythic', unlock: WHEEL,
    bg: ['#0a0e1c', '#161c3a', '#242a50'], surface: '#141a34', accent: '#c9d6ff',
    blocks: ['#c9d6ff', '#e8e8ff', '#9fb0e8', '#dcc6f7', '#7f9cff', '#f2f2f2'],
    decor: 'stars', material: 'glow', particle: 'glow', dark: true,
  },
  {
    id: 'dreamscape', name: 'Dreamscape', rarity: 'mythic', unlock: WHEEL,
    bg: ['#fbe6ff', '#e0e6ff', '#e6fff2'], surface: '#f2e8ff', accent: '#b98cf0',
    blocks: ['#f7c6ff', '#c6d4ff', '#c6fff0', '#ffe0c6', '#f0c6e0', '#d4c6ff'],
    decor: 'clouds', material: 'holo', particle: 'star', dark: false,
  },
  {
    id: 'void', name: 'Void', rarity: 'mythic', unlock: WHEEL,
    bg: ['#020104', '#0c0414', '#1a0a2c'], surface: '#0e061c', accent: '#a855f7',
    blocks: ['#a855f7', '#4fe0ff', '#0a0a0a', '#2a0a3a', '#7f2cef', '#1a0a2c'],
    decor: 'nebula', material: 'glow', particle: 'glow', dark: true,
  },
  {
    id: 'timetemple', name: 'Time Temple', rarity: 'mythic', unlock: WHEEL,
    bg: ['#140f08', '#2e2412', '#3e3018'], surface: '#241c0e', accent: '#e8b23e',
    blocks: ['#e8b23e', '#c9a35f', '#4f8ef7', '#8a6a3a', '#e8e0c8', '#7a5a2e'],
    decor: 'gears', material: 'metal', particle: 'rune', dark: true,
  },
  {
    id: 'magiclibrary', name: 'Magic Library', rarity: 'mythic', unlock: WHEEL,
    bg: ['#0a0810', '#1c1626', '#2a2038'], surface: '#181228', accent: '#e8b23e',
    blocks: ['#e8b23e', '#7fd6ff', '#b98cf0', '#5fe0a0', '#e8e0c8', '#ff6f9c'],
    decor: 'runes', material: 'glow', particle: 'rune', dark: true,
  },

  // ---------- LEGENDARY ----------
  {
    id: 'galaxycore', name: 'Galaxy Core', rarity: 'legendary', unlock: WHEEL,
    bg: ['#020108', '#0a0620', '#160c3c', '#241458'], surface: '#120a2c', accent: '#c67fef',
    blocks: ['#4fe0ff', '#c67fef', '#ff6fc4', '#7f5cff', '#5fe0a0', '#ffd75e'],
    decor: 'nebula', material: 'holo', particle: 'star', dark: true,
  },
  {
    id: 'heavenearth', name: 'Heaven & Earth', rarity: 'legendary', unlock: WHEEL,
    bg: ['#fef6e0', '#fce6b0', '#f6d080'], surface: '#faedc8', accent: '#e8b23e',
    blocks: ['#f7ecd0', '#e8b23e', '#7fbfe8', '#c9a35f', '#ffffff', '#9fd6c0'],
    decor: 'clouds', material: 'marble', particle: 'feather', dark: false,
  },
  {
    id: 'infernokingdom', name: 'Inferno Kingdom', rarity: 'legendary', unlock: WHEEL,
    bg: ['#0a0402', '#1e0a04', '#3a1204', '#5c1c04'], surface: '#180702', accent: '#ff5a1e',
    blocks: ['#ff5a1e', '#ffb23e', '#8a1808', '#e02e0e', '#0a0402', '#3a1204'],
    decor: 'embers', material: 'obsidian', particle: 'ember', dark: true,
  },
  {
    id: 'cosmicocean', name: 'Cosmic Ocean', rarity: 'legendary', unlock: WHEEL,
    bg: ['#020818', '#04182e', '#0a2c4a', '#123f5c'], surface: '#0a2438', accent: '#4fe0d0',
    blocks: ['#4fe0d0', '#7f5cff', '#4f8ef7', '#c67fef', '#5fe0a0', '#ffd75e'],
    decor: 'nebula', material: 'glass', particle: 'bubble', dark: true,
  },
  {
    id: 'goldenempire', name: 'Golden Empire', rarity: 'legendary', unlock: WHEEL,
    bg: ['#1c1408', '#3a2a10', '#4a3414'], surface: '#241a0a', accent: '#e8b23e',
    blocks: ['#e8b23e', '#c9302e', '#3fae5a', '#4f8ef7', '#a855f7', '#e8e0c8'],
    decor: 'sparkle', material: 'marble', particle: 'rune', dark: true,
  },
  {
    id: 'worldtree', name: 'World Tree', rarity: 'legendary', unlock: WHEEL,
    bg: ['#040f08', '#0c2414', '#163a1c', '#204a24'], surface: '#0e2414', accent: '#5fe0a0',
    blocks: ['#5fe0a0', '#8a5a3c', '#e8b23e', '#b98cf0', '#7fef8f', '#c9a35f'],
    decor: 'leaves', material: 'wood', particle: 'leaf', dark: true,
  },
  {
    id: 'dimensionalrift', name: 'Dimensional Rift', rarity: 'legendary', unlock: WHEEL,
    bg: ['#02040c', '#0c0a24', '#1c0a3c', '#2c0c50'], surface: '#140a2c', accent: '#ff4ecb',
    blocks: ['#4fe0ff', '#ff4ecb', '#7f5cff', '#e02e6e', '#a855f7', '#5fe0a0'],
    decor: 'glitch', material: 'holo', particle: 'pixel', dark: true,
  },
  {
    id: 'godstorm', name: 'Godstorm', rarity: 'legendary', unlock: WHEEL,
    bg: ['#08080c', '#181c2c', '#282e44', '#383e5c'], surface: '#181c2c', accent: '#ffd75e',
    blocks: ['#ffd75e', '#9fd6ff', '#4f8ef7', '#e8e8ff', '#7f9cff', '#c9d6ff'],
    decor: 'lightning', material: 'metal', particle: 'lightning', dark: true,
  },
  {
    id: 'eternalicepalace', name: 'Eternal Ice Palace', rarity: 'legendary', unlock: WHEEL,
    bg: ['#eefaff', '#d0eefb', '#b0e0f2', '#94d0ec'], surface: '#e0f4fb', accent: '#4fc0e0',
    blocks: ['#ffffff', '#bfeaf7', '#7fd6ef', '#4fc0e0', '#9db8f2', '#dff2fb'],
    decor: 'snow', material: 'crystal', particle: 'crystal', dark: false,
  },
  {
    id: 'universe', name: 'Universe', rarity: 'legendary', unlock: WHEEL,
    bg: ['#020106', '#0a0618', '#160c30', '#241450'], surface: '#120a28', accent: '#c67fef',
    blocks: ['#4fe0ff', '#c67fef', '#ff6fc4', '#7f5cff', '#ffd75e', '#5fe0a0'],
    decor: 'nebula', material: 'glow', particle: 'star', dark: true,
  },

  // ---------- EXOTIC ----------
  {
    id: 'blackhole', name: 'Black Hole', rarity: 'exotic', unlock: WHEEL,
    bg: ['#000000', '#0a0512', '#1c0c2a'], surface: '#0a0512', accent: '#c67fef',
    blocks: ['#00f7ff', '#a855f7', '#ff7a3d', '#ff6fc4', '#4f8ef7', '#ffffff'],
    decor: 'nebula', material: 'obsidian', particle: 'glow', dark: true,
  },
  {
    id: 'quantum', name: 'Quantum', rarity: 'exotic', unlock: WHEEL,
    bg: ['#050818', '#0e1030', '#1a1440'], surface: '#0c1028', accent: '#4fe0ff',
    blocks: ['#4fe0ff', '#7f5cff', '#ffffff', '#00d4ff', '#a855f7', '#5f7cff'],
    decor: 'sparkle', material: 'crystal', particle: 'ripple', dark: true,
  },
  {
    id: 'liquidchrome', name: 'Liquid Chrome', rarity: 'exotic', unlock: WHEEL,
    bg: ['#050505', '#101014', '#1a1a1e'], surface: '#0c0c0e', accent: '#c9ccd6',
    blocks: ['#c9ccd6', '#8f95a3', '#4fe0ff', '#a855f7', '#4f8ef7', '#ff9c4a'],
    decor: 'clouds', material: 'metal', particle: 'spark', dark: true,
  },
  {
    id: 'prism', name: 'Prism', rarity: 'exotic', unlock: WHEEL,
    bg: ['#0a0a14', '#141428', '#1c1c38'], surface: '#0e0e1c', accent: '#b98cf0',
    blocks: ['#ff6f6f', '#ff9c4a', '#ffe14a', '#5fe07a', '#4fe0ff', '#b98cf0'],
    decor: 'sparkle', material: 'crystal', particle: 'crystal', dark: true,
  },
  {
    id: 'glitchexotic', name: 'Glitch', rarity: 'exotic', unlock: WHEEL,
    bg: ['#000000', '#0a0a1e', '#140a2a'], surface: '#0a0a18', accent: '#ff2fd4',
    blocks: ['#00e5ff', '#ff2fd4', '#5f7cff', '#a855f7', '#aef23e', '#ff7a1e'],
    decor: 'glitch', material: 'glitch', particle: 'pixel', dark: true,
  },
  {
    id: 'zerogravity', name: 'Zero Gravity', rarity: 'exotic', unlock: WHEEL,
    bg: ['#080818', '#101830', '#182040'], surface: '#0e1428', accent: '#4f8ef7',
    blocks: ['#4f8ef7', '#4fe0ff', '#a855f7', '#ff9c4a', '#ff6fc4', '#5fe07a'],
    decor: 'fireflies', material: 'glass', particle: 'glow', dark: true,
  },
  {
    id: 'darkmatter', name: 'Dark Matter', rarity: 'exotic', unlock: WHEEL,
    bg: ['#020104', '#0a0414', '#160a24'], surface: '#0a0512', accent: '#a855f7',
    blocks: ['#7f2cef', '#4fe0ff', '#dc143c', '#4f8ef7', '#ffffff', '#ff4ecb'],
    decor: 'nebula', material: 'obsidian', particle: 'glow', dark: true,
  },
  {
    id: 'holographic', name: 'Holographic', rarity: 'exotic', unlock: WHEEL,
    bg: ['#050a14', '#0c1428', '#141c38'], surface: '#0c121e', accent: '#4fe0ff',
    blocks: ['#4fe0ff', '#5f7cff', '#a855f7', '#ff6fc4', '#5fe07a', '#ff9c4a'],
    decor: 'lightning', material: 'holo', particle: 'pixel', dark: true,
  },
  {
    id: 'eclipse', name: 'Eclipse', rarity: 'exotic', unlock: WHEEL,
    bg: ['#000000', '#0a0a20', '#140a30'], surface: '#0a0a16', accent: '#f4c542',
    blocks: ['#0a0a0a', '#f4c542', '#ffffff', '#7f2cef', '#1c1c3a', '#ff9c4a'],
    decor: 'aurora', material: 'obsidian', particle: 'spark', dark: true,
  },
  {
    id: 'infinity', name: 'Infinity', rarity: 'exotic', unlock: WHEEL,
    bg: ['#040414', '#0a0a2a', '#140c3c'], surface: '#0a0a1e', accent: '#4fe0ff',
    blocks: ['#4f5cff', '#a855f7', '#4fe0ff', '#ffffff', '#ff6fc4', '#7f5cef'],
    decor: 'nebula', material: 'holo', particle: 'glow', dark: true,
  },

  // ---------- SECRET ----------
  {
    id: 'secret', name: "I'M SECRET", rarity: 'secret', unlock: SECRET,
    bg: ['#000000', '#050507'], surface: '#0a0a0d', accent: '#00f7ff',
    blocks: ['#0a0a0a', '#1a0a2c', '#0a2c2c', '#e8e8e8', '#0a0a0a', '#1a0a2c'],
    decor: 'glitch', material: 'secret', particle: 'binary', dark: true,
  },
];
