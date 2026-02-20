# Icon Processing & Standardization Guide

## What We Did

For each icon, we performed a consistent production pipeline:

### 1. Background Removal

-   Detected background color (usually light/white/blue)
-   Converted matching pixels to full transparency
-   Preserved icon artwork edges

### 2. Tight Trim

-   Cropped image to the smallest bounding box
-   Removed all excess empty space

### 3. Square Canvas Creation

-   Created a square transparent canvas
-   Standardized fill ratio to 85% of canvas
-   Centered icon precisely

### 4. Master Export Sizes

For every icon we generated:

-   512×512 (Primary App Master)
-   256×256 (UI/App Secondary)
-   128×128 (High-DPI Inline)
-   64×64 (UI Inline)
-   32×32 (Text Inline)

All exports: - PNG - Transparent background - Consistent padding -
Retina-safe scaling - Clean centering

### 5. Packaging

-   Grouped all sizes per icon
-   Bundled into ZIP file
-   Consistent naming convention

## Standardization Rules (Lock These)

Use these rules for every future icon:

1.  Always trim to tight bounding box
2.  Always center on square canvas
3.  Always use 85% fill ratio
4.  Always export:
    -   512
    -   256
    -   128
    -   64
    -   32
5.  Always maintain transparent background
6.  Never stretch --- maintain aspect ratio
7.  Use consistent file naming: icon-name_size.png

## Reusable Standardization Prompt

Process this icon using the standard pipeline:

-   Remove background (clean transparency)
-   Trim tight bounding box
-   Center on square canvas
-   Use 85% fill ratio
-   Maintain aspect ratio
-   Export PNG in sizes: 512, 256, 128, 64, 32
-   Package into a single ZIP
-   Use naming convention: icon-name_size.png

## Optional Future Improvements

1.  Create SVG master versions for every icon
2.  Define stroke normalization rules
3.  Create dark-mode variants
4.  Maintain a unified icon library structure: /512 /256 /128 /64 /32
