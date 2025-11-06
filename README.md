# Pandoc Template Repository

> A repository of Pandoc-compatible templates, ready to go.

Welcome to Zettlr's Pandoc Template Repository. This repository hosts a variety of Pandoc-compatible templates that you can use to transform your Markdown files ready for various conferences, journals, or just for your own pleasure.

This repository aims to grow over time based on user-contributions. Each folder contains all necessary files for one template, including a metadata file with some information.

## Usage

To use these templates, you have two options. The first is to use [Zettlr](https://www.zettlr.com/), which parses the metadata file from this repository automatically, and allows you to install these templates with a beautiful, graphical user interface.

You can also browse these templates from the Zettlr template browser. (TODO)

However, in line with our approach to keep everything fully open, we made sure that these templates work with Pandoc as-is, which means that you do not have to use Zettlr or any specific app to download and use these templates. You can download and use individual templates yourself, using Pandoc directly, or any other app that uses Pandoc under the hood, such as RMarkdown or Quarto. However, please note that, depending on your exact setup, some changes may be required.

To use the templates "bare metal," you can try the following. First, download the entire template folder which you want to use (e.g., `cup-journal`) to your computer. Then, with a Markdown document ready at hand, you can run the following code:

```bash
pandoc --defaults /path/to/the/template/defaults.yml -o output.ext markdown-file.md
```

## Contribute

This repository depends on user contributions, which are described in our [contribution guide](./CONTRIBUTING.md). Please refer to the section on repository structure below to learn how to add or modify templates from a technical perspective. To add a contribution, please follow these steps:

1. Clone this repository locally: `git clone https://github.com/Zettlr/pandoc-templates`
2. Implement your changes or add your template
3. Test your changes (i.e., run an export and verify that it works)
4. Create or adapt the `index.yml` file
5. Commit your changes
6. Open a Pull Request

Once you have opened a pull request, it will be reviewed by trusted contributors, who may instruct you to implement certain changes. Once your PR passes, it will be merged.

> [!NOTE]
> Before starting to add new templates, please review our [contribution guide](./CONTRIBUTING.md). Contributions that do not follow this guide will be rejected without discussion. This pertains particularly to copyrighted content.

## Repository Structure

This section introduces the repository structure. Whenever you add or remove files, or modify a `index.yml` file, ensure that the structure remains valid. Several automated workflows continuously monitor all PRs and verify that none harms the consistency of the file structure.

### File: `metadata.json`

The metadata file serves as a machine-maintained and machine-readable entry point into the repository. Do not modify or touch this file under any circumstances. Zettlr (and, potentially other apps who digest this file) require that the file retains its structure at all times. You may inspect the file. It consists of a large array with one metadata chunk for each template folder. Essentially, each entry corresponds to the same format as the `index.yml` file, with a few changes:

* Each entry has an `id` property equal to its folder name.
* The preview image will be an absolute URL to the image on the repository.
* The object contains `reader` and `writer` properties, indicating from which format Pandoc can convert it into which other format.

### Individual Folder Structure / API Schema

Each individual folder must contain four files at minimum:

* A `index.yml` file, which serves as the entry point for an individual template, and allows apps to digest this repository.
* A `preview.png` file, which is a 600x480px preview image for this template.
* The `template.xyz` file (where `xyz` is the proper filename extension, such as `.tex` or `.htm`). Note that reference docs (as used by Pandoc) are also called "template" for consistency reasons.
* A `defaults.yml` file, which contains directives for Pandoc to export a file using the template successfully.

All other files in the folder are deemed required files for the template. You can add as many or few that you want, and in principle there are no strict naming restrictions (aside that they should not contain spaces, and only stick to the 26 English alphabet characters, and digits).

> [!TIP]
> Refer to the [CONTRIBUTING](CONTRIBUTING.md) file to learn how to create your own template.

### `index.yml`

Each template metadata file requires a set of fields. Below is one example of such a index.yml file:

```yml
name: "Network Science Research Article Submission"
version: 1
updated: "2025-05-03T20:40:00+02:00"
description: |
  Use this template to export your submission to the journal Network Science
  using the official template from Cambridge University Press.
template: template.tex
preview: preview.png
authors:
  original: "Cambridge University Press"
  templater: "Hendrik Erz <hendrik@zettlr.com>"
copyright: "All rights reserved (Cambridge University Press)"
```

> [!TIP]
> Each metadata file will be checked against the YAML schema file [`template.schema.json`](./template.schema.json) by automated workflows. We recommend you use VS Code or instruct your editor of choice to validate the `index.yml` files against this schema to ensure your file is valid.

#### `name` (required)

This must be a descriptive name for the template.

#### `version` (required)

The version number. This is simply an integer. This field must be initiated with `1` for a new template. Each change – even if it is just a single character – must result in an increase of this number. "Change" is defined as a single PR, so you can make multiple changes to a template, and only increment the version once.

#### `updated` (required)

The last updated timestamp, using the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601). Should include the timezone (e.g., `+02:00` for CEST, `-05:00` for EST, or `Z` for UTC).

#### `description` (required)

Describe what this template is, what it aims for, or anything else that is important to know before choosing to use this template. Markdown is supported. Do not include a description of the variables supported by this template, or any setup instructions here. See below.

#### `instructions` (optional)

An optional field with specific instructions for using this template, e.g., for setup. Use this also to, e.g., describe to your users which frontmatter variables your template supports (or which it doesn't).

#### `changelog` (optional/required)

The `changelog` field is optional for version 1, but mandatory for every version afterwards. It is a list of entries, ordered chronologically descending. That is, if you add a changelog entry to an existing template, it must be the first entry. (This makes it easier for users to parse changelogs, as they can be sure the first entry is the most recent change.) You can use Markdown in it, but each item should be short and concise. Use this property in particular to denote changes to the defaults file.

#### `authors` (required)

Tell users who created the template originally, and who adapted the template to use with Pandoc (may contain the same information if you, e.g., created the template from scratch). If you are a contributor, add your name there, too.

* `authors.original`: The name of the original author of the layout
* `authors.templater`: The name of the person who converted this layout into a Pandoc-compatible template
* `authors.contributors`: A list of names of any additional contributors

The fields can be a simple string (implies that this is just the name). You can also be more explicit and use `name: The name`. You must use the property-format if you also want to add an `email` and a `website` (optional).

#### `copyright` (required)

Use this field to tell people the copyright of the template file(s). Ideally, should be a permissive license, but this can also be some form of "all rights reserved" (usually for templates from organizations, e.g., journals).

#### `license` (optional)

If the work has been licensed, include information about it here.

### `defaults.yml`

This is a Pandoc-compatible defaults file. It is required so that users can start using the template with zero setup (except downloading the template). Use this file to do three things:

1. Tell Pandoc where the main entry file for the template is (usually something like `template.tex`).
2. Tell Pandoc the supported `reader` and `writer`, as well as potential extensions (e.g., `+mark`).
3. Add any other information Pandoc needs to successfully produce output (e.g., `shift-heading-level-by: 1` if the template should only use headings level 2 and below).

A minimal example of a `defaults.yml` file for a LaTeX template would be:

```yml
reader: markdown
writer: pdf
pdf-engine: xelatex
template: template.tex
```

### `preview.png`

The preview image must be in 600x480px, which is landscape. It should show how the template looks like when you export a file with it. Where the looks are not the crucial part — such as templates for conferences or journals —, you may also add the conference or journal logo, if copyright permits. We do not yet have hard requirements for this image, except that it must show the template's output, and not violate any common rules of civility. We take discretion in refusing images we deem inappropriate.

## License

This repository is free to use for anybody. It is not licensed, as each template requires its own license field. Refer to the individual folders to learn about the templates' licenses.
