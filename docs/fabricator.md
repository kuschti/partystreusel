### Data
Im atoms/form/checkbox.html einen Button einbinden und daten via yml übergeben.

checkboxdata.yml (liegt im selben Ordner wie html)
{{{material 'buttons.default' checkboxdata}}}

im button.html kann so auf die Daten im yml zugegriffen werden.

Oder, via front-matter im checkbox.html, mit ```form-checkbox``` (gleich wie Ordern+Dateiname) werden die front-matter Daten übergeben

```
---
Name: 'neuer Button'
---
{{{material 'buttons.default' form-checkbox}}}
```
