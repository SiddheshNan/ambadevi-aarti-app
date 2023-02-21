

for i in range(6, 120):
    print(f'export const aartiSangrah{i} = Asset.fromModule(require("../../docs/aarti-sangrah/aarti-sangrah-{i}.pdf"));')