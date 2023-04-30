# mundo-maps

## これは何？

- `mundo-maps` は MUNDO プロジェクトの一部です
  - MUNDO は、UN Open GIS Initiative のドメインワーキンググループ 7「Smart Maps」チームによって開発されています
- MUNDO は、 "Model United Nations Development and Operations" の略です
  - MUNDO は、国連平和維持活動と国連開発計画に焦点を当てた模擬国連です
- MUNDO は、OSS 開発を通じて、国連平和維持活動および国連開発計画における地理空間的なシチュエーションアウェアネスを強化することを目的としています
- `mundo-maps` は、特に、国連における地理空間情報システムの開発と運用をシミュレーションすることに焦点を当てています
- `mundo-maps` は、 OpenStreetMap, ReliefWeb などのオープンデータに基づいています

## なぜ MUNDO が必要？

- 国連は OSS の開発を積極的に推奨しています
- しかし、国連の実際のデータの多くは機密事項であり、一般には公開されていません
- また、国連がどのようなソフトウェアやデータを求めているのかも明らかではありません
- そこで、MUNDO は、オープンデータに基づく模擬国連を実施することで、国連におけるソフトウェアやデータの要件を探っています
- こうしたシミュレーションを通じて、より有用な OSS を開発することを目指しています

## 何ができる？

- `mundo-maps` は、非常にシンプルな仕組みとルールに基づいて動作するソフトウェアです
- `mundo-maps` を使うことで、特定の地域における、任意の地理空間的な懸念事項を強調して表現したデジタル地図を、素早く作成することができます
  - これによって、「いまどこに誰が居るのか」「いまどこに何が在るのか」「いまどこで何が起こっているのか」という知覚のシチュエーションアウェアネスを強化できます
  - `mundo-maps` は、国連に限らず、地方自治体や NGO 団体などにおいても、地理空間的なシチュエーションアウェアネスの強化のために活用できます
- UNMISS (United Nations Mission in South Sudan) における `mundo-maps` の具体的な運用例を、以下の URL とスクリーンショットで確認してください

### https://mundo.yuiseki.net/missions/UNMISS

### 南スーダン共和国における軍事施設と国連関連施設を表示する

[![Image from Gyazo](https://i.gyazo.com/1c951a512b4d5d55a7c4a066d81e055a.png)](https://gyazo.com/1c951a512b4d5d55a7c4a066d81e055a)

[![Image from Gyazo](https://i.gyazo.com/048d9a4332d0f764a733787c165deb8b.png)](https://gyazo.com/048d9a4332d0f764a733787c165deb8b)

### 南スーダン共和国における医療施設を表示する

[![Image from Gyazo](https://i.gyazo.com/e1c0df4e6532a7900d8e7816fa9ad922.png)](https://gyazo.com/e1c0df4e6532a7900d8e7816fa9ad922)

### 南スーダン共和国における通行止めの道路を表示する

[![Image from Gyazo](https://i.gyazo.com/a16fec8372618629e3af70696faced6a.png)](https://gyazo.com/a16fec8372618629e3af70696faced6a)

[![Image from Gyazo](https://i.gyazo.com/52c52135eb943fe834cbef3b0952aa42.png)](https://gyazo.com/52c52135eb943fe834cbef3b0952aa42)

### 南スーダン共和国における武力衝突地域を表示する

[![Image from Gyazo](https://i.gyazo.com/74ea7b2fff67489ea0d892b6290bdc8d.png)](https://gyazo.com/74ea7b2fff67489ea0d892b6290bdc8d)

[![Image from Gyazo](https://i.gyazo.com/24433d619775435216631d4e39a6adca.png)](https://gyazo.com/24433d619775435216631d4e39a6adca)

[![Image from Gyazo](https://i.gyazo.com/e8c5c298406d9e06bcf6ca1d064f48a1.png)](https://gyazo.com/e8c5c298406d9e06bcf6ca1d064f48a1)

[![Image from Gyazo](https://i.gyazo.com/e20a4faeab56e0149a730ded0811b33c.png)](https://gyazo.com/e20a4faeab56e0149a730ded0811b33c)

## どうやって動いている？

### 地域と懸念事項の定義

- まず、 YAML ファイルで、地図として表示したい対象地域と、対象とする懸念事項を定義します
  - この YAML ファイルは OpenStreetMap からデータを取得するために用いられます
    - `mundo-maps` は OpenStreetMap のデータを Overpass API を通じて取得しています
  - 何が可能かを知るには、既存の `./missions/${missionName}/` ディレクトリ内の `overpass.yml` ファイルを見てください
  - ミッションや地域を新たに追加するには、 `./missions/${missionName}/` ディレクトリを作成し、 `overpass.yml` ファイルを追加するだけです
- `overpass.yml` ファイルを変更または追加したら、 `npm run fetch-overpass` コマンドを実行します
  - このコマンドは `./missions/${missionName}/` ディレクトリ内にある `overpass.yml` ファイルを全て探し、それらの内容に基づいて Overpass API を呼び出し、結果を `public/data` ディレクトリに保存します

[![Image from Gyazo](https://i.gyazo.com/936c1e4d50a4d493844354f16de78657.png)](https://gyazo.com/936c1e4d50a4d493844354f16de78657)

[![Image from Gyazo](https://i.gyazo.com/b043c456f887fc7e096b51e148e98206.png)](https://gyazo.com/b043c456f887fc7e096b51e148e98206)

[![Image from Gyazo](https://i.gyazo.com/f5aaf5e3cfb59a098c6a9f81ea46d1bc.png)](https://gyazo.com/f5aaf5e3cfb59a098c6a9f81ea46d1bc)

### 「一時的な懸念事項」の扱い

- `mundo-maps` は、先述したように、OpenStreetMap を基本地物の情報源として利用しています
  - もし、あなたが追加したい情報が一般に公開可能で、かつ、 OpenStreetMap のポリシーに適合する場合、OpenStreetMap に貢献するべきです
  - ただし、 OpenStreetMap は多くのユーザーが利用している公共的なシステムであり、一貫したポリシーに従うことが求められます
  - そのため、 OpenStreetMap に情報を追加することが必ずしも適切ではない場合があります
- 特に、OpenStreetMap は、「一時的な情報は取り扱わない」というポリシーがあります
  - 一時的な情報とは、例えば、事件、事故、災害、紛争などです
  - `mundo-maps` では、これらの情報を「一時的な懸念事項」と呼びます
- `mundo-maps` は、必要に応じて OpenStreetMap のデータを上書きする仕組みを持っており、こうした「一時的な懸念事項」も扱うことができます
  - YAML ファイルで OpenStreetMap ID を指定して、 OpenStreetMap の情報をベースにしつつ、一時的な情報を上書きして地図上に表示することができます
  - 何が可能かを知るには、既存の `./missions/${missionName}/` ディレクトリ内の `incidents` ディレクトリや `road_closed` ディレクトリを見てください。
  - インシデント情報を新たに追加するには、 `./missions/${missionName}/incidents/${year}/${month}/${day}` ディレクトリを作成し、 `${OpenStreetMapId}.yml` ファイルを追加するだけです
  - 通行止め情報を新たに追加するには、 `./missions/${missionName}/road_closed/${year}/${month}/${day}` ディレクトリを作成し、 `${OpenStreetMapId}.yml` ファイルを追加するだけです
- YAML ファイルを変更または追加したら、 `npm run fetch-overpass` コマンドを実行します
  - このコマンドは `./missions/${missionName}/incidents` ディレクトリ内にある `${openStreetMapId}.yml` ファイルを全て探し、それらの内容に基づいて Overpass API を呼び出し、YAML ファイルに基づいて内容を上書きし、結果を `public/data` ディレクトリに保存します

[![Image from Gyazo](https://i.gyazo.com/023e2da70daa156d0fadb6e1cac24ae9.png)](https://gyazo.com/023e2da70daa156d0fadb6e1cac24ae9)

[![Image from Gyazo](https://i.gyazo.com/f742a1729cf517cd6d1b5d815cecd1a8.png)](https://gyazo.com/f742a1729cf517cd6d1b5d815cecd1a8)

[![Image from Gyazo](https://i.gyazo.com/9dd1613b4753695c98c286e945d5f676.png)](https://gyazo.com/9dd1613b4753695c98c286e945d5f676)

### アクセス制限されているデータ（Classified data）の扱い

- `mundo-maps` は、アクセス制限されているデータ（Classified data）も扱うことができます
  - 例えば、 `mundo-maps` は、国連内部で構築されている数種類のベクトルタイル地図を、基盤地図として表示できます
  - これらはアクセスが制限されており、国連のイントラネットに接続している、かつ、閲覧権限のあるユーザーのみが使用できます
- 同様に、 `mundo-maps` の仕組みとしては、懸念事項に関してもアクセスを制限し、限られたユーザーにのみ表示することも、技術的には可能です

[![Image from Gyazo](https://i.gyazo.com/46a523018154f49ef5fef215102fb67e.png)](https://gyazo.com/46a523018154f49ef5fef215102fb67e)

## 既知の問題、開発中の制限事項

- 「一時的な懸念事項」は、YAML ファイルとして追加すると、たとえ時間が経って状況が変化しても、自動的には地図上から消えません
  - よって、誤った情報や古い情報が表示されてしまう可能性があります
  - 今後、YAML ファイルに最終確認日などのメタデータを追加することによって、一時的な懸念事項が継続していたり解消したことを表現できるように対応します
