### helpers

#### iterate
{{#iterate 5}}
  Helper to iterate x times
{{/iterate}}

#### increment
Helper to increment index with 1
{{increment @index}} = actual @index +1
{{increment 1}} = 2 (1+1)

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


#### front-matter
```
---
icolist2:
  - this
  - that
  - there
---
{{#test2}}
  {{this}}
{{/test2}}

```

```
---
icolist:
  item1:
    test: gugug
    title: sdfsdf
  item2:
    test: gsdf
    title: sdfsdfsdf
  item3:
    test: sdfsdf
    title: sdfsdf
---
// name of material file = iconbar/iconbar.html
{{#each iconbar-iconbar.icolist}}
  {{test}}
  {{title}}
{{/each}}

```

#### material data in fabricator views
front-matter inside material

    ---
    foo: bar
    ---

use data inside view and materials loop

    {{#each items}}
    {{data.foo}}
    {{/each}}
