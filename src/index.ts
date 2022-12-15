// import { DiffResult, Character } from "./types";
// import deleteRef from "./utils/deleteRef";
// import fromCharacters from "./utils/fromCharacters";
// import getAllParts from "./utils/getAllParts";
// import toCharacters from "./utils/toCharacters";

// let getDiff = (partsArr: Character[][], arr1: Character[], arr2: Character[]) => {
//   let str2 = fromCharacters(arr2);
//   let matched = new Map<Symbol | null, string>();
//   let matchedIndicies: { [key: string]: number } = {};

//   // For each slice of the first string, attempt to match
//   // it in the second string.
//   partsArr.forEach((part: Character[]) => {
//     let partString = fromCharacters(part);

//     // One day, `RegExp.replace` will hopefully be built-in.
//     let pattern = new RegExp(partString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

//     // If this slice of text matches ANY part of the string, it's in.
//     let result = pattern.exec(str2);
//     let resultIndex = result?.index;
//     let pastMatchLength = matchedIndicies[resultIndex ?? ""] || 0;

//     // Give matched strings of longer length over all others.
//     if (result && (partString.length > pastMatchLength)) {
//       matchedIndicies[resultIndex as number] = partString.length;

//       // Since this is matched, I can safely update the second
//       // string with symbol references.
//       part.forEach((partItem, index) => {
//         let characterIndex = (resultIndex as number) + index;
//         let originalItem = arr1[partItem.index];

//         // The first string character has already been matched
//         // with a second string character. Skip it!
//         if (
//           originalItem.pointsTo &&
//           originalItem.pointsTo !== arr2[characterIndex].ref
//         ) {
//           return;
//         }

//         // Create a two-way binding between the characters:
//         // Point the first string character to the second's ref.
//         originalItem.pointsTo = arr2[characterIndex].ref;
//         arr2[characterIndex].pointsTo = partItem.ref;
//       });

//       // At this point, it's possible that other parts
//       // already matched the string and had their items set to the
//       // `matched` store. We need to find those indicies and unset them.
//       for (let i = result.index; i < result.index + pastMatchLength; i++) {
//         matched.delete(arr1[i]?.ref);
//       }

//       // Throw each of the matched characters into storage.
//       // These will always be from the FIRST string.
//       part.forEach((char) => matched.set(char.ref, char.value));
//     }
//   });

//   // Search through our matched items for an item by this ref.
//   let hasNoMatchingRef = (char: Character, property: keyof Character) =>
//     !matched.get(char[property] as any);

//   return {
//     // First string characters NOT in the "matched" set.
//     removed: arr1
//       .filter((char: Character) => hasNoMatchingRef(char, "ref"))
//       .map(deleteRef),

//     // Second string characters NOT in the "matched" set.
//     // Since the matched collection will only contain the refs of the
//     // first string, we need to search by 'pointsTo' here.
//     added: arr2
//       .filter((char: Character) => hasNoMatchingRef(char, "pointsTo"))
//       .map(deleteRef),
//   };
// };

// let striff = (str1: string, str2: string): DiffResult => {
//   let strArr1 = toCharacters(str1);
//   let strArr2 = toCharacters(str2).map((char, index) => {
//     let str1Char = strArr1[index];

//     // If the character value matches in the first string,
//     // point this character & that character to the same ref.
//     if (str1Char?.value === char.value) {
//       char.pointsTo = str1Char.ref;
//     }

//     return char;
//   });

//   return getDiff(
//     getAllParts(strArr1),
//     strArr1,
//     strArr2
//   );
// };

// export default striff;

const getDiff = function(str1: string, str2: string){
  var N = str1.length, M = str2.length, MAX = N + M, furthestReaching = [], D, k, x, y, step, src = [], target = [], stepMap = [], dist = MAX, a;
  for(;dist--;)stepMap[dist]=[];
  furthestReaching[MAX + 1] = 0;
  for(D = 0; D <= MAX && dist === -1; D++){
    for(k = -D, x, y, step; k <= D && dist === -1; k+=2){
      if(k === -D || (k !== D && furthestReaching[k - 1 + MAX] < furthestReaching[k + 1 + MAX])) x = furthestReaching[k + 1 + MAX], step = 3;
      else x = furthestReaching[k - 1 + MAX] + 1, step = 2;
      y = x - k;
      stepMap[x][y] = step;
      while(x < N && y < M && str1[x] === str2[y]) x++, y++, stepMap[x][y] = 0;
      furthestReaching[k + MAX] = x;
      if(x >= N && y >= M) dist = D;
    }
  }
  for(;N || M;){
    a = stepMap[N][M]; src.unshift(a > 2 ? -1 : str1[N-1]); target.unshift(a == 2 ? -1 : str2[M-1]); a < 3 && N--; a != 2 && M --;
  }

  return [ src, target ]
}

const striff = (str1: string, str2: string) => {
  const [src, target] = getDiff(str1, str2);

  console.log(src, target)

  const removed = target.reduce((acc, value, index) => {
    if(value === -1) {
      acc.push({ value: src[index], index });
    }

    return acc;
  }, []);

  const added = src.reduce((acc, value, index) => {
    if(value === -1) {
      acc.push({ value: target[index], index });
    }

    return acc;
  }, []);

  return { added, removed };
}

export default striff
