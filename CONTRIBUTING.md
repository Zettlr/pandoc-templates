# Contributing

Thank you for contributing to the Pandoc Template Repository! In this document, we describe everything you need to know to successfully open your first PR. We will discuss some general guidelines, and describe the steps required to either modify an existing template, or adding another template.

> [!NOTE]
> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

> [!NOTE]
> This document defines the terms "layout," "template," and "reference doc" as such: A "layout" for the purposes of this document is, e.g., a `.tex` or `.html`-file that can be filled with content to produce a specific layout of text, but which is not compatible with Pandoc's template syntax. A `template` is this layout, but adapted so that Pandoc can use it as a template. A "reference doc" is a variation of the "template" for use with output formats of Pandoc that support reference docs instead of templates. Naturally, if you create a template for the intent purpose of using it with Pandoc, the "layout" and "template" are one and the same file.

## General Guidelines

The Pandoc Template Repository is intended for community-created and journal- or conference-provided templates that can be used to format Markdown documents (or anything that Pandoc can ingest) in a specific style. That being said, each template needs to follow some criteria:

* It MUST be suitable for a somewhat larger audience. "Somewhat larger audience" SHOULD reference an academic field, a community of people, or any social context that is not defined by kinship. Whether your template fulfills this will be discussed on a case-by-case basis. If you design your own templates, and you believe other people may find them aesthetic, it is suited for this repository. It does not have to be a template for a conference or journal.
* It SHOULD make liberal use of the Pandoc templating system to allow for more than one specific use-case, and ensure that end users can adapt the template to their own documents.
* It MUST be usable as-is, that is, anything dynamic in the template is REQUIRED to be customizable via YAML frontmatter variables, and MUST NOT require the user to modify the template itself.
* It SHOULD NOT require an internet connection to work, that is, all resources the template needs (except, e.g., packages from CTAN) SHOULD be present in the folder. Exceptions are discussed on a case-by-case basis (such as JavaScript libraries for HTML templates).
* You MUST have the right to provide the resources for the template in this repository. If you are not certain (e.g., because you want to adapt a template which has no clearly visible license), it is your responsibility to research this fact, and reflect it appropriately.
* The template SHOULD NOT be time-limited. However, some conferences have new templates each year. In these cases, the template is still suitable for this repository, since the conference itself is not strictly time-limited. Ideally, you SHOULD update an existing template, and denote the corresponding year for which the template is valid in description and/or name, instead of creating new templates each year.
* The language used for the metadata is English. The template can be in a different language (e.g., Portuguese if it is aimed only at, say, Brazilian scholars), and the description MUST indicate this fact, but the metadata itself MUST be in English.
* The template MUST NOT contain any profane language, or language not suitable for an audience below the age of 18. It MUST NOT be in any way legally objectionable in any country globally. You MUST follow common standards for what you can, and cannot write on the internet.

These guidelines are subject to change as we encounter more questions and discussions about whether or not to include a particular template. If you cannot fulfill one or more of these guidelines, you can make a case for inclusion of your template anyways, which will be heard.

### Creating New Templates

Before creating a new template, you MUST make sure that the template does not yet exist in the repository. If the layout has been transformed into a template by someone else already, you MUST modify the template, instead of creating a new one.

**Folder Name**: To create a new template, you MUST create a new folder in this repository. The folder name MUST reflect the template name and SHOULD be an abbreviation. It MUST be an abbreviation if the name is very long. It is RECOMMENDED to use a template provider's "official" abbreviation where available. (Example: The journal "Network Science" abbreviates itself "nws".) The folder name MUST consist of digits, English alphabet letters, and hyphens (a-z0-9-), and it MUST NOT contain any spaces. It MUST be lowercase. It SHOULD be less than 20 characters in length.

### Modifying Existing Templates

To modify an existing template, first make sure that you are familiar with its workings. Ideally, you should be using the template yourself, since most changes SHOULD be rather bug fixes than actual visual changes.

Then, implement your changes to the template files. Afterwards you MUST follow these steps:

1. Add your name to the `authors.contributors` key in the `index.yml` file, if you aren't already an author in there. Create the key if necessary.
2. Update the `updated` timestamp in the `index.yml` file.
3. If necessary/applicable, update `description` and `instructions` in the `index.yml` file.
4. If your change introduced a visual change, we RECOMMEND you update the `preview.png` file.
5. You MUST increment the `version` field in `index.yml` by one.
6. We RECOMMEND you add at least one new entry to the `changelog` key in the `index.yml` file. Create the key if necessary. You MUST include one individual entry for every field you changed in the `defaults.yml` file.

## Guidelines for Template Files

### The `index.yml` file

Fill this file according to the technical specification in the README file.

The `name` property MUST contain the official name of the layout (e.g., the journal name for a template using the journal's official layout). It MUST NOT be a duplicate of an existing name in this repository.

The `description` MUST be precise in explaining to users what they can and cannot do with this template. You MUST use full sentences. Do not use bullet points. However, keep the description as short and concise as possible.

The optional `instructions` property MAY be used to indicate to users any additional steps they need to follow before they can use the template. We RECOMMEND to enumerate the specific LaTeX packages they will need, and indicate any other additional software they may need to install on their computers in this property.

The `authors` MUST correctly reflect the authorship of layout and template. If you found a template online, you MUST accredit the original author. If you yourself designed the template from scratch, "original" and "templater" are the same person.

The `copyright` MUST under all circumstances be precise. If you cannot find a correct copyright for the template, you SHALL NOT propose its inclusion in this repository.

The `changelog` key MUST implement the following guidelines. It MUST be a list of changes implemented since version 1. It MUST contain one entry each per version. More specifically, for every change to the accompanying defaults file, it MUST indicate what you changed, and how. For example, if you changed the `reader` property of the defaults file from `markdown` to `markdown+mark`, you SHOULD write a changelog entry like the following: "Changed the `reader` property in the defaults file from `markdown` to `markdown+mark`." A changelog entry MUST end with a period (`.`). We RECOMMEND you create multiple changelog entries if you did multiple changes, so that the individual bullet points are shorter.

### The `preview.png` file

The `preview.png` file should serve as a quick visual indicator for how the template looks once you export a file with it. For conference or journal templates, you may be able to provide their logo instead. Make sure the copyright allows this.

The image MUST be in landscape orientation and be exactly 600x480px in resolution. It MUST be below 1MB in file size. While especially PDF templates usually result in portrait orientation pages, landscape is more common on the internet, and as such we default to landscape images. You MAY use this to your advantage to include multiple pages in the preview image.

The image MUST NOT contain personal or private information, or reveal any specific information that has nothing to do with the template itself. It MAY contain actual published text, such as a paper.

### The `defaults.yml` file

The `defaults.yml` file is a Pandoc defaults file that contains instructions for Pandoc that allow it to render your template appropriately. It SHOULD be crafted in such a way that the user does not have to change it in order to properly export files.

The file MUST feature a `reader` and `writer` property which can be parsed to indicate to the user how the template is intended to be used. The `reader` SHOULD be `markdown` and MAY include any Pandoc extensions. You can use a different reader, though, where applicable.

The file MUST NOT contain any input or output file specification. This MUST be provided by the user.

The file MUST contain the `template` directive relative to the template file. That is, usually, it should be `template: template.tex` (for a LaTeX template).

The file SHOULD NOT contain more than the absolute minimum of other fields as needed for proper output.

All changes made to this file after the fact MUST BE documented in the `changelog` field of the `index.yml` file.
