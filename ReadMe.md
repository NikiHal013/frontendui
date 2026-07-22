# Deníček projektu — Exam modul

Tento dokument popisuje chronologický vývoj modulu `packages/exam` — správy zkoušek (Exam) a jejich částí v rámci školního informačního systému.

---

## 28. 4. 2026 — Setup projektu a inicializace

**Co bylo potřeba udělat:**
Vytvořit modul od nuly pro správu zkoušek (Exam) s CRUD operacemi nad entitou Exam a ExamParts (části zkoušky).

**Co jsme descobili:**
Struktura GraphQL pro Exam se liší od Subject — zkouška má více částí, každá s vlastní konfigurací a bodováním.

**Výsledek — vytvořené soubory:**
- Komponenty: `CardCapsule`, `Children`, `ConfirmEdit`, `Filter`, `LargeCard`, `Link`, `LiveEdit`, `MediumCard`, `MediumContent`, `MediumEditableContent`, `Table`
- Mutace: `Create`, `Delete`, `Update`, `InteractiveMutations`
- Stránky: `PageBase`, `PageCreateItem`, `PageDeleteItem`, `PageNavbar`, `PageReadItem`, `PageReadItemEx`, `PageUpdateItem`, `PageVector`, `RouterSegment`
- Nový `ExamEditForm.jsx` pro specifickou editaci zkoušky
- `SemesterSelect.jsx` pro výběr semestru

---

## 6. 5. 2026 — Refaktor komponent a mutací

**Co se dělalo:**
- Refaktoring všech komponent tak, aby správně pracovaly s datovými strukturami Exam modulu
- Úprava mutací (`Create`, `Delete`, `Update`) pro správné odesílání dat na server
- Testování integrace s GraphQL endpointem

**Co jsme descobili:**
Mutace `Update` vyžaduje `lastchange` timestamp — bez něj server odmítne aktualizaci. Bylo potřeba sledovat toto pole na klientovi.

---

## 7. 5. 2026 — Formátování editačního formuláře

**Problém:**
`ExamEditForm` nevypadal správně, editační pole nebyla jasně organizována.

**Řešení:**
- Přeformátování formuláře (`ExamEditForm.jsx`)
- Lepší řazení polí a skupiny atributů
- Přidání validace

---

## 28. 5. 2026 — Admin rozhraní a useEdit hook

**Co se dělalo:**
- Přidání admin rozhraní pro správu zkoušek
- Integrace `useEditAction` hooku pro lepší správu editačního stavu
- Zkoušení live vs confirm režimů

**Co jsme descobili:**
`useEditAction` z `packages/dynamic` má dva režimy — live (okamžité ukládání) a confirm (explicitní tlačítko). Confirm režim je pro Exam vhodný, aby se zabránilo nechtěným změnám.

---

## 31. 5. — 1. 6. 2026 — ExamParts problematika

**Problém:**
Zkouška se skládá z více částí (ExamParts), ale jejich správa nebyla funkční. Chyběly:
- Přidávání nových částí
- Mazání částí
- Editace částí
- Řazení částí

**Co jsme descobili:**
- Nové ExamParts musí mít UUID generované klientem
- Při smazání ExamPart je nutné zkontrolovat, zda nejsou na ni navázány výsledky studentů
- Pořadí (order) částí se musí automaticky spravovat

**Řešení — vylepšení komponent:**
- Implementace `ExamParts.jsx` komponent pro správu částí zkoušky
- Přidávání, editace a mazání ExamParts
- Inline editace (název, typ, maximální body, atd.)
- Validace pořadí a mazání s kontrolou závislostí
- Rozšíření `MediumEditableContent.jsx` pro integraci ExamParts

---

## 1. 6. 2026 — Vylepšení správy ExamParts

**Co se dělalo:**
- Oprava vytváření ExamParts — UUID se teď generuje správně na klientovi
- Vylepšení mazání — rollback v UI při selhání
- Přidání unlink funkcionalitu — odpojování studijních plánů od zkoušky
- Vyčištění atributů s bodováním v `MediumContent`

**Bug — smazání ExamParts:**
Původně se část smazala optimisticky, ale pokud server smazání odmítl (dependent data), zbývaly částí se špatnými order čísly.

**Řešení:**
- Potvrzovací dialog před smazáním
- Rollback pořadí v UI, pokud smazání selže
- Server nyní vrátí aktuální seznam částí po změně

---

## 11. 5. 2026 — Aktualizace MediumContent a atributů

**Co se dělalo:**
- Rozšíření `MediumContent.jsx` o nové atributy pro zobrazení zkoušky
- Úprava `MediumEditableContent.jsx` pro editaci atributů
- Přidání nových labelů a validací

---

## 14. 6. 2026 — Sorting a validace bodů

**Problém:**
V tabulce zkoušek nebylo možné řadit. Také chyběla validace maximálních bodů — mohl jsem zadat jakékoliv číslo.

**Řešení:**
- Implementace client-side sortingu v `Table.jsx`
- Přidání `SortButton` komponenty
- Validace: součet bodů všech ExamParts nesmí překročit maximální body zkoušky
- Vylepšení `ExamEditForm` pro kontrolu součtu

---

## 29. 6. 2026 — Klient-side sorting pro tabulku

**Co se dělalo:**
- Implementace dynamického sortingu v `Table.jsx`
- Podpora řazení podle více sloupců
- Optimalizace — při aktivaci sortu se loadují všechny záznamy najednou

---

## 20. 7. 2026 — JSDoc dokumentace

**Co se dělalo:**
- Přidání JSDoc konfigurace (`jsdoc.config.json`)
- Dokumentování všech komponent a queries
- Vygenerování HTML dokumentace do `docs/` složky

**Výsledek:**
- Nová složka `packages/exam/docs/` s kompletní dokumentací
- Příkaz `npm run docs -w @nik-kb-sp/pck_exam` pro regeneraci

---

## 20. 7. 2026 — Tlačítko pro přidání ExamParts

**Co se dělalo:**
- Přidání viditelného tlačítka "Přidat novou část" do formuláře
- Zlepšení UX — snazší přidávání nových částí zkoušky

---

## 21. 7. 2026 — Vylepšení GraphQL dotazů

**Co se dělalo:**
- Optimalizace GraphQL fragmentů pro Exam data
- Přidání nových polí do queries pro lepší zobrazení
- Vylepšení načítání dat z backendu

---

## 22. 7. 2026 — Cascade delete a finální úpravy

**Co se dělalo:**
- Implementace cascade delete — při smazání Exam se automaticky smažou všechny ExamParts
- Reassign studijních plánů — po smazání ExamPart se studijní plány přepojí na ostatní části
- Poslední bump verze a dokumentace

**Problém:**
Při smazání ExamPart je nutné zajistit, aby žádný studijní plán nezůstal bez reference.

**Řešení:**
- Server automaticky přesouvá studijní plány na jinou dostupnou část zkoušky
- Klient zobrazí informaci o počtu přesunutých plánů

---

## Přehled commitů

| Datum | Commit | Co se řešilo |
|---|---|---|
| 28. 4. 2026 | `new version setup`, `package version update` | Inicializace projektu |
| 6. 5. 2026 | `Refactor components and update mutation logic` | Refaktor komponent a mutací |
| 7. 5. 2026 | `zmeny bez funkcniho graphQL`, `formatovani examedit`, `opravy pridat part` | Formátování a opravy formuláře |
| 28. 5. 2026 | `admin+useEdit` | Admin rozhraní a useEdit hook |
| 31. 5. 2026 | `parts_patch`, `patch part 2`, `patch part 3` | Opravy ExamParts |
| 1. 6. 2026 | `Enhance Exam Parts`, `Fix exam part creation`, `improve exam parts deletion`, `add unlink plan functionality` | Vylepšení správy ExamParts |
| 1. 6. 2026 | `clean up rendering logic for score attributes` | Vyčištění atributů s bodováním |
| 1. 6. 2026 | `bump version to 0.0.8 for app_exam and 0.0.3 for pck_exam` | Bump verze |
| 14. 6. 2026 | `Enhance Exam Table and Edit Form functionality with score validation and sorting` | Sorting a validace bodů |
| 29. 6. 2026 | `feat: implement client-side sorting for exam table with dynamic sort configuration` | Klient-side sorting |
| 20. 7. 2026 | `jsdoc_v1`, `jsdoc update` | JSDoc konfigurace a dokumentace |
| 20. 7. 2026 | `Button_pridat_pridan` | Tlačítko pro přidání ExamParts |
| 21. 7. 2026 | `enhance GraphQL queries and components for exam management` | Vylepšení GraphQL |
| 22. 7. 2026 | `update documentation timestamps and enhance SemesterSelect component functionality` | Aktualizace dokumentace |
| 22. 7. 2026 | `implement cascade delete for exams and reassign study plans on part deletion` | Cascade delete a reassign plánů |
| 22. 7. 2026 | `bump verze`, `dalsi bump verze` | Finální bump verze |

---

## URI fragment

```
/exam
```

## Jak spustit projekt

```cmd
npm run dev -w @nik-kb-sp/app_exam
```

## Jak sestavit projekt

```cmd
npm run build -w @nik-kb-sp/app_exam
```
