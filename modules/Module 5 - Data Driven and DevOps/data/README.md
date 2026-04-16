# Module 5 Data Files

- `posts.csv` is used directly for CSV-driven API tests.
- `posts.generated.xlsx` is created at runtime by the test and then read back as Excel input.

Why generate Excel at runtime?
- Keeps the repository text-based and easier to version.
- Still demonstrates real Excel-driven execution using the `xlsx` package.
