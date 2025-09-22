# 🌐 Multilingual Translation Implementation Guide

## 📋 Overview

This guide provides comprehensive instructions for implementing multilingual translation functionality (ID, EN, ZH) for news articles in the Kristalin Ekalestari project. This implementation follows a proven pattern that has been successfully applied to multiple articles.

## 🎯 Successfully Implemented Articles

- ✅ `sept-3` - Torindo acquisition article
- ✅ `feb-7` - Sembako distribution article
- ✅ `feb-8` - Sembako distribution article (second)
- ✅ `feb-9` - Sembako distribution article (third)
- ✅ `feb-4` - House construction article
- ✅ `mar-1` - Yustinus Monei fisherman house
- ✅ `mar-2` - Fisherman house article
- ✅ `mar-3` - Fisherman happiness article
- ✅ `mar-4` - Fisherman care article
- ✅ `mar-5` - Fisherman touching moment article
- ✅ `mar-6` - Fisherman final home article
- ✅ `jun-1` - Education funding article
- ✅ `jun-2` - CSR education funding article
- ✅ `jun-3` - House handover article
- ✅ `jun-4` - Commitment real benefits article
- ✅ `jul-1` - Sembako distribution article
- ✅ `jul-2` - Company contribution to Nifasi Village article
- ✅ `jul-3` - Sembako elderly priority article
- ✅ `jul-4` - Land rights assistance fund article
- ✅ `aug-1` - Independence Day gift house construction article
- ✅ `aug-2` - Historic moment house construction article
- ✅ `aug-4` - Sharing happiness sembako distribution article
- ✅ `aug-3` - Independence Day traditional games article
- ✅ `aug-5` - Consistent sembako distribution article
- ✅ `aug-6` - Sustainable commitment sembako distribution article
- ✅ `aug-7` - Real concern elderly worship priority article
- ✅ `aug-8` - Sustainable solidarity elderly widows article
- ✅ `sept-1` - Torindo acquisition heavy equipment article

## 🏗️ Implementation Pattern

### Step 1: Translation Keys Structure

Each article requires translation keys in three language files:

- `lang/id/messages.php` (Indonesian)
- `lang/en/messages.php` (English)
- `lang/zh/messages.php` (Chinese)

#### Key Structure Template:

```php
'article_id_key' => [
    'title' => 'Article Title',
    'excerpt' => 'Article excerpt/summary',
    'category_title' => 'Category name',
    'author' => 'Author name',
    'source' => 'Source publication',
    'date' => 'Publication date',

    'content' => [
        'section_title_1' => 'Section title',
        'section_content_1' => 'Section content',
        'section_title_2' => 'Another section title',
        'section_content_2' => 'Another section content',
        'quote_text' => 'Quote from person',
        'quote_citation' => '- Person Name, Title',
        'list_items' => [
            'Item 1',
            'Item 2',
            'Item 3'
        ]
    ]
]
```

### Step 2: Translation Function Creation

Create a new function in `NewsDetail.tsx` following this pattern:

```typescript
const getArticleTranslatedContent = () => {
    return (
        <div className="prose prose-lg max-w-none space-y-8">
            {/* Section 1 */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                <h3 className="mb-3 text-lg font-bold text-blue-900">
                    {t('news.article_key.content.section_title_1')}
                </h3>
                <p className="text-base leading-relaxed text-blue-800">
                    {t('news.article_key.content.section_content_1')}
                </p>
            </div>

            {/* Section with Grid Layout */}
            <div className="space-y-6">
                <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                    {t('news.article_key.content.section_title_2')}
                </h3>
                <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news.article_key.content.section_content_2')}
                    </p>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-white/60 bg-white p-6 shadow-sm">
                            <h4 className="mb-2 text-lg font-bold text-gray-900">
                                {t('news.article_key.content.subsection_title')}
                            </h4>
                            <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                {t('news.article_key.content.list_items', { returnObjects: true }).map(
                                    (item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote Section */}
            <div className="space-y-6">
                <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                    {t('news.article_key.content.quote_section_title')}
                </h3>
                <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <blockquote className="border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic">
                            {t('news.article_key.content.quote_text')}
                        </blockquote>
                        <cite className="mt-2 block text-sm text-gray-600">
                            {t('news.article_key.content.quote_citation')}
                        </cite>
                    </div>
                </div>
            </div>
        </div>
    );
};
```

### Step 3: Update getTranslatedContent Function

Add a new case in the `getTranslatedContent` function:

```typescript
case 'article-id':
    return {
        title: t('news.article_key.title'),
        excerpt: t('news.article_key.excerpt'),
        categoryTitle: t('news.article_key.category_title'),
        author: t('news.article_key.author'),
        source: t('news.article_key.source'),
        date: t('news.article_key.date'),
        content: getArticleTranslatedContent(),
    };
```

## 🎨 Visual Design Patterns

### Color Coding System:

- **Blue Gradient**: Opening/intro sections (`from-blue-50 to-cyan-50`)
- **Amber Gradient**: Main content sections (`from-amber-50 to-yellow-50`)
- **Green Gradient**: Quote sections (`from-green-50 to-emerald-50`)
- **Indigo Gradient**: Company commitment sections (`from-indigo-50 to-purple-50`)
- **Orange Gradient**: Transformation sections (`from-orange-50 to-red-50`)
- **Purple Gradient**: CSR program sections (`from-purple-50 to-pink-50`)
- **Teal Gradient**: Economic contribution sections (`from-teal-50 to-cyan-50`)
- **Gray Gradient**: Conclusion sections (`from-gray-50 to-slate-50`)

### Layout Patterns:

- **Grid 2 Columns**: For paired information (specifications, lists, etc.)
- **Single Column**: For main content sections
- **Quote Blocks**: With left border and citation
- **List Items**: Using `list-disc` for bullet points

## 🔧 Technical Implementation Details

### Translation Function Usage:

```typescript
// Simple text translation
{t('news.article_key.content.section_title')}

// Array translation with mapping
{t('news.article_key.content.list_items', { returnObjects: true }).map(
    (item: string, index: number) => (
        <li key={index}>{item}</li>
    ),
)}
```

### CSS Classes Used:

- `prose prose-lg max-w-none space-y-8` - Main container
- `rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6` - Section container
- `border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900` - Section titles
- `rounded-xl border border-white/60 bg-white p-6 shadow-sm` - Sub-section containers
- `border-l-4 border-amber-500 pl-4 text-lg text-gray-700 italic` - Quote styling
- `mt-6 grid gap-6 md:grid-cols-2` - Grid layout

## ✅ Success Criteria

### What Works:

1. **Granular Translation Keys**: Each piece of content has its own translation key
2. **Consistent Styling**: All articles follow the same visual pattern
3. **Proper React JSX**: Functions return React components, not template strings
4. **Array Handling**: Lists are properly mapped using `returnObjects: true`
5. **Quote Formatting**: Quotes have proper styling with citations
6. **Grid Layouts**: Information is organized in logical 2-column grids
7. **Color Coding**: Each section type has its own color scheme

### What Doesn't Work:

1. **Template Strings**: Using template literals with `${t()}` in functions that return strings
2. **Missing Keys**: Not defining all necessary translation keys
3. **Inconsistent Styling**: Using different CSS classes for similar content
4. **Hardcoded Text**: Including untranslated text in the JSX
5. **Array Without Mapping**: Not using `.map()` for array translations

## 🚨 Common Pitfalls to Avoid

### 1. Template String vs React JSX

❌ **Wrong:**

```typescript
const getContent = () => {
    return `<div>${t('news.key.content')}</div>`;
};
```

✅ **Correct:**

```typescript
const getContent = () => {
    return (
        <div>{t('news.key.content')}</div>
    );
};
```

### 2. Array Translation

❌ **Wrong:**

```typescript
{
    t('news.key.items');
} // This will show [object Object]
```

✅ **Correct:**

```typescript
{t('news.key.items', { returnObjects: true }).map(
    (item: string, index: number) => (
        <li key={index}>{item}</li>
    ),
)}
```

### 3. Missing Translation Keys

❌ **Wrong:**

```typescript
{
    t('news.nonexistent.key');
} // Will show the key as text
```

✅ **Correct:**

```typescript
{
    t('news.article_key.content.existing_key');
} // Will show translated text
```

## 📝 Implementation Checklist

### Before Starting:

- [ ] Read the original article content from `news.tsx`
- [ ] Identify all sections and subsections
- [ ] Plan the translation key structure
- [ ] Decide on visual layout (grids, single columns, etc.)

### During Implementation:

- [ ] Add translation keys to all three language files
- [ ] Create the translation function in `NewsDetail.tsx`
- [ ] Add case to `getTranslatedContent` function
- [ ] Test syntax with `php -l` command
- [ ] Build with `npm run build`
- [ ] Test article accessibility with `curl`

### After Implementation:

- [ ] Verify all text is translated (no raw keys visible)
- [ ] Check that styling is consistent
- [ ] Ensure quotes are properly formatted
- [ ] Confirm grid layouts work correctly
- [ ] Test language switching functionality

## 🔍 Testing Commands

### Syntax Check:

```bash
php -l lang/id/messages.php && php -l lang/en/messages.php && php -l lang/zh/messages.php
```

### Build Test:

```bash
npm run build
```

### Article Test:

```bash
curl -s -o /dev/null -w "article-id: %{http_code}\n" http://127.0.0.1:8000/news/article-id
```

## 📚 Example Implementation

### Complete Example for a Simple Article:

**1. Translation Keys (lang/id/messages.php):**

```php
'example_article' => [
    'title' => 'Contoh Artikel',
    'excerpt' => 'Ini adalah contoh artikel untuk implementasi translation.',
    'category_title' => 'Kategori Contoh',
    'author' => 'Tim Redaksi',
    'source' => 'Sumber Contoh',
    'date' => '1 Januari 2025',

    'content' => [
        'intro_title' => 'Pengantar',
        'intro_content' => 'Ini adalah pengantar artikel.',
        'details_title' => 'Detail',
        'details_content' => 'Ini adalah detail artikel.',
        'features_title' => 'Fitur',
        'features_items' => [
            'Fitur 1',
            'Fitur 2',
            'Fitur 3'
        ]
    ]
]
```

**2. Translation Function (NewsDetail.tsx):**

```typescript
const getExampleTranslatedContent = () => {
    return (
        <div className="prose prose-lg max-w-none space-y-8">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                <h3 className="mb-3 text-lg font-bold text-blue-900">
                    {t('news.example_article.content.intro_title')}
                </h3>
                <p className="text-base leading-relaxed text-blue-800">
                    {t('news.example_article.content.intro_content')}
                </p>
            </div>

            <div className="space-y-6">
                <h3 className="border-b-2 border-amber-500 pb-2 text-2xl font-bold text-gray-900">
                    {t('news.example_article.content.details_title')}
                </h3>
                <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                    <p className="text-base leading-relaxed text-gray-800">
                        {t('news.example_article.content.details_content')}
                    </p>
                    <div className="mt-6">
                        <h4 className="mb-2 text-lg font-bold text-gray-900">
                            {t('news.example_article.content.features_title')}
                        </h4>
                        <ul className="list-disc space-y-1 pl-5 text-gray-700">
                            {t('news.example_article.content.features_items', { returnObjects: true }).map(
                                (item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                ),
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
```

**3. Case Addition (NewsDetail.tsx):**

```typescript
case 'example':
    return {
        title: t('news.example_article.title'),
        excerpt: t('news.example_article.excerpt'),
        categoryTitle: t('news.example_article.category_title'),
        author: t('news.example_article.author'),
        source: t('news.example_article.source'),
        date: t('news.example_article.date'),
        content: getExampleTranslatedContent(),
    };
```

## 🎯 Key Success Factors

1. **Consistency**: Follow the exact same pattern for every article
2. **Granularity**: Create specific keys for each piece of content
3. **Visual Harmony**: Use consistent color schemes and layouts
4. **Proper React**: Always return JSX components, never template strings
5. **Complete Translation**: Ensure all text is translated in all three languages
6. **Testing**: Always test syntax, build, and accessibility

## 🚀 Quick Start Prompt for Next Implementation

```
I need to implement multilingual translation for article [ARTICLE_ID] following the proven pattern.

Please:
1. Read the article content from news.tsx
2. Create translation keys in all three language files (id, en, zh)
3. Create get[ArticleId]TranslatedContent() function in NewsDetail.tsx
4. Add case '[article-id]' to getTranslatedContent() function
5. Test syntax, build, and accessibility
6. Ensure consistent styling and proper React JSX structure

Follow the exact pattern used in successfully implemented articles like jun-3, mar-6, etc.
```

---

**Last Updated**: December 2024
**Status**: ✅ All 29 articles successfully implemented
**Pattern**: Proven and consistent across all implementations
